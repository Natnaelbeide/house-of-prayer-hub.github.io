/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface PrayerFollowUpEmailProps {
  fullName?: string
  email?: string
  phone?: string
  request?: string
}

const PrayerFollowUpEmail = ({
  fullName = 'Church visitor',
  email = 'Not provided',
  phone = 'Not provided',
  request = 'Prayer request submitted through the church website.',
}: PrayerFollowUpEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Immediate follow-up reminder for {fullName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>IMMEDIATE FOLLOW-UP REMINDER</Text>
        <Heading style={heading}>Please Reach Out</Heading>
        <Text style={text}>
          {fullName} requested follow-up with their prayer request. Please contact them as soon as possible.
        </Text>
        <Section style={details}>
          <Text style={value}><strong>Email:</strong> {email}</Text>
          <Text style={value}><strong>Phone:</strong> {phone}</Text>
          <Text style={value}><strong>Request:</strong> {request}</Text>
        </Section>
        <Text style={footer}>House of Prayer Church DMV pastoral care reminder</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PrayerFollowUpEmail,
  subject: (data) => `Follow up now: ${data.fullName || 'prayer request'}`,
  displayName: 'Immediate prayer follow-up reminder',
  previewData: {
    fullName: 'Church visitor',
    email: 'visitor@example.com',
    phone: '(555) 555-0123',
    request: 'Please pray for healing and peace for my family.',
  },
  to: 'houseofprayerdmv@gmail.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', padding: '32px 28px', margin: '0 auto' }
const eyebrow = { color: '#bf8c2c', fontSize: '12px', fontWeight: 'bold' as const, margin: '0 0 10px' }
const heading = { color: '#1b2a6b', fontSize: '28px', margin: '0 0 16px' }
const text = { color: '#5f6475', fontSize: '15px', lineHeight: '1.6', margin: '0 0 22px' }
const details = { borderLeft: '4px solid #bf8c2c', backgroundColor: '#f8f7f3', padding: '18px 20px' }
const value = { color: '#282b35', fontSize: '15px', lineHeight: '1.6', margin: '0 0 10px' }
const footer = { color: '#777b89', fontSize: '12px', margin: '24px 0 0' }
