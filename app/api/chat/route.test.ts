/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'

// Mock the AI SDK modules BEFORE importing the route
jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn(() => 'mocked-model'),
}))

const mockConvertToModelMessages = jest.fn((...args: any[]) => Promise.resolve(args[0]))
const mockStreamText = jest.fn((..._args: any[]) => ({
  toUIMessageStream: jest.fn(() => 'mocked-ui-stream'),
}))

jest.mock('ai', () => ({
  convertToModelMessages: (...args: any[]) => mockConvertToModelMessages(...args),
  createUIMessageStream: jest.fn(({ execute }) => {
    // Execute immediately to trigger the mocked functions
    execute({ writer: { merge: jest.fn() } })
    return 'mocked-stream'
  }),
  createUIMessageStreamResponse: jest.fn(() => {
    return new Response('mocked-stream', { status: 200 })
  }),
  streamText: (...args: any[]) => mockStreamText(...args),
}))

// Now import the route after mocks are set up
import { POST } from './route'

describe('POST /api/chat', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, OPENAI_API_KEY: 'test-api-key' }
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns 503 when OPENAI_API_KEY is missing', async () => {
    delete process.env.OPENAI_API_KEY

    const mockRequest = {
      headers: new Headers(),
      json: async () => ({ messages: [] }),
    } as NextRequest

    const response = await POST(mockRequest)

    expect(response.status).toBe(503)
    const text = await response.text()
    expect(text).toBe('Service unavailable')
  })

  it('returns 429 when rate limit is exceeded', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '1.2.3.4' }),
      json: async () => ({ messages: [] }),
    } as NextRequest

    // Make 11 requests (rate limit is 10)
    for (let i = 0; i < 11; i++) {
      const response = await POST(mockRequest)
      if (i === 10) {
        expect(response.status).toBe(429)
        const text = await response.text()
        expect(text).toContain('Too many requests')
      }
    }
  })

  it('processes chat messages successfully', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '5.6.7.8' }),
      json: async () => ({
        messages: [
          { role: 'user', content: 'Tell me about Rakesh' },
        ],
      }),
    } as NextRequest

    const response = await POST(mockRequest)

    expect(response.status).toBe(200)
    expect(mockStreamText).toHaveBeenCalled()
  })

  it('limits message history to last 20 messages', async () => {
    const messages = Array.from({ length: 25 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `Message ${i}`,
    }))

    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '9.10.11.12' }),
      json: async () => ({ messages }),
    } as NextRequest

    await POST(mockRequest)

    // Verify that convertToModelMessages was called with only the last 20 messages
    expect(mockConvertToModelMessages).toHaveBeenCalled()
    const callArgs = mockConvertToModelMessages.mock.calls[0][0]
    expect(callArgs.length).toBe(20)
    expect(callArgs[0].content).toBe('Message 5')
    expect(callArgs[callArgs.length - 1].content).toBe('Message 24')
  })
})
