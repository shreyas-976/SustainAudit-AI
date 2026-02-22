# SustainAudit-AI

**Agentic AI Sustainability Claims Verification System**

## 🚀 Overview

SustainAudit AI is an **Agentic AI-powered sustainability audit system** that autonomously verifies environmental and ethical claims made by D2C brands.

Consumers today encounter terms like:

* “Eco-friendly”
* “Carbon-neutral”
* “Sustainably sourced”
* “Ethically produced”

However, there is no scalable way to verify these claims before making purchasing decisions.

Our system solves this by performing an automated sustainability audit — extracting claims, validating them, detecting greenwashing risks, and generating a structured sustainability score with a recommendation verdict.

## 🎯 Problem Statement

D2C brands often make bold sustainability claims without easily verifiable proof. This leads to:

* Greenwashing
* Consumer misinformation
* Lack of accountability
* Trust erosion

Manual verification is time-consuming and impractical at scale.

We aim to build an **autonomous AI agent** that can verify sustainability claims instantly.

## 🧠 Our Solution

Given a product or brand URL, SustainAudit AI:

1. Scrapes website content
2. Extracts sustainability claims using LLMs
3. Generates verification plans autonomously
4. Validates certifications
5. Retrieves supporting evidence
6. Detects greenwashing indicators
7. Computes a sustainability score
8. Produces an audit report with verdict

Verdict categories:

* ✅ Approved
* ⚠ Conditional
* ❌ Rejected
* 
## 🏗️ System Architecture
User / Trigger
      │
      ▼
  n8n Automation
      │
      ▼
 FastAPI Backend
      │
      ▼
Scraper → Claim Extraction → Planner Agent
      │
      ▼
Certification Validation → Evidence Search
      │
      ▼
Greenwashing Detection → Scoring Engine
      │
      ▼
      Verdict
      │
      ▼
Structured Audit Report

## ⚙️ Tech Stack

### Backend

* FastAPI (Python)
* OpenRouter LLM APIs
* GPT-4o-mini (primary)
* GPT-5.2 (advanced reasoning optional)

### Automation

* n8n Workflow Automation

  * Watchlist monitoring
  * Scheduled audits
  * Alerts & triggers

## 🤖 Agentic AI Capabilities

Our system demonstrates agentic behavior by:

* Dynamically extracting claims
* Planning verification steps autonomously
* Executing validation tools
* Generating risk signals
* Producing decision-ready audit reports
* Supporting automated monitoring workflows

This moves beyond generative AI into **decision-support AI agents**.
## 🔗 n8n Automation Workflows

### 1️⃣ Manual Audit Trigger

Webhook → Backend Audit → Report

### 2️⃣ Watchlist Monitoring

Cron → Brand List → Audit → Alerts

### 3️⃣ Score Change Detection

Track sustainability score drift

### 4️⃣ News/Controversy Trigger

Re-audit brands on ESG news

## 🧪 Demo Flow

1. User inputs brand/product URL
2. AI extracts sustainability claims
3. Agent plans verification tasks
4. Certifications validated
5. Risks & flags detected
6. Sustainability score generated
7. Final verdict displayed


## 📊 Example Output Fields

* Extracted claims
* Verification plan
* Certification validation
* Evidence references
* Greenwashing flags
* Sustainability score
* Confidence level
* Final verdict

## 🚧 Challenges Faced

* Handling noisy web data
* Token optimization for LLM calls
* Designing agentic verification planning
* Separating AI reasoning from automation workflows
* Building modular architecture within hackathon time

---

## 🌍 Vision & Impact

Our long-term vision is to integrate SustainAudit AI with:

* E-commerce platforms
* AI shopping assistants
* Browser extensions
* ESG monitoring systems

This enables real-time sustainability verification at scale — empowering consumers and holding brands accountable.

## 👥 Team Contributions

* Backend AI & Agents
* Automation (n8n workflows)
* Frontend dashboard
* Pitch & product storytelling


## 📌 Conclusion

SustainAudit AI transforms sustainability verification from a manual, trust-based process into an autonomous, AI-driven audit system — enabling transparent, scalable, and actionable sustainability intelligence.
