/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ChainPrayerReminderProps {
  fullName?: string
  slotLabel?: string
}

const ChainPrayerReminderEmail = ({
  fullName = 'Prayer partner',
  slotLabel = 'your prayer hour',
}: ChainPrayerReminderProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your prayer hour starts soon: {slotLabel}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HOUSE OF PRAYER CHURCH DMV</Text>
        <Heading style={heading}>Your Prayer Hour Starts Soon</Heading>
        <Text style={intro}>
          {fullName}, this is your reminder — the chain of prayer comes to you shortly.
        </Text>

        <Section style={slotBox}>
          <Text style={label}>Your prayer hour (Eastern Time)</Text>
          <Text style={slotValue}>{slotLabel}</Text>
          <Text style={note}>Beginning in about one hour.</Text>
        </Section>

        <Text style={verse}>"Pray without ceasing." — 1 Thessalonians 5:17</Text>
        <Text style={footer}>
          Reply to this email if you can no longer cover this hour, or to stop these reminders.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ChainPrayerReminderEmail,
  subject: (data) => `Reminder: your prayer hour is ${data.slotLabel || 'coming up'}`,
  displayName: 'Chain prayer hour reminder',
  previewData: {
    fullName: 'Prayer partner',
    slotLabel: '5:00 AM – 6:00 AM',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', padding: '32px 28px', margin: '0 auto' }
const eyebrow = {
  color: '#bf8c2c',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  letterSpacing: '1px',
  margin: '0 0 10px',
}
const heading = { color: '#1b2a6b', fontSize: '28px', margin: '0 0 16px' }
const intro = { color: '#5f6475', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }
const slotBox = {
  borderTop: '3px solid #bf8c2c',
  backgroundColor: '#f8f7f3',
  padding: '20px',
  textAlign: 'center' as const,
}
const slotValue = { color: '#1b2a6b', fontSize: '26px', fontWeight: 'bold' as const, margin: '6px 0 8px' }
const label = {
  color: '#1b2a6b',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  margin: '10px 0 3px',
  textTransform: 'uppercase' as const,
}
const note = { color: '#777b89', fontSize: '13px', margin: '0' }
const verse = { color: '#bf8c2c', fontSize: '15px', fontStyle: 'italic' as const, margin: '24px 0 0' }
const footer = { color: '#777b89', fontSize: '12px', lineHeight: '1.5', margin: '14px 0 0' }
