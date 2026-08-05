# Smart Task Manager 🚀

A modern AI-powered task management application built with Next.js, React, TypeScript, and Tailwind CSS.

Smart Task Manager helps users organize tasks, track progress, manage productivity, and get AI-powered planning assistance through an integrated AI assistant.

---

## 🌐 Live Demo

[https://smart-task-manager-lovat-kappa.vercel.app/](https://smart-task-manager-lovat-kappa.vercel.app/)

---

# Features

## Task Management

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Search tasks
- Filter tasks by status
- Priority management (High, Medium, Low)
- Task statistics dashboard
- Local Storage persistence
- Responsive design

---

# AI Planner

Smart Task Manager includes an AI productivity assistant.

The AI assistant can:

- Answer productivity questions
- Analyze user's tasks
- Suggest priorities
- Provide recommendations
- Help plan schedules

AI features:

- Streaming AI responses
- Multi-turn conversations
- OpenRouter AI integration
- Markdown responses
- Loading/thinking state
- Stop generation button
- Retry on errors
- Auto-scroll chat
- Mobile-friendly interface

---

# FE-07 Tool Integration

The application includes an AI tool called:

`analyzeTasks`

This tool allows the AI to analyze the user's task list and return structured productivity data.

## Tool Input

The tool receives:

- Task title
- Completion status
- Priority level

Example:

{  
"tasks": [  
{  
"title": "Complete assignment",  
"completed": false,  
"priority": "High"  
}  
]  
}

## Tool Output

The tool returns:

- Total tasks
- Completed tasks
- Pending tasks
- High priority tasks
- Medium priority tasks
- Low priority tasks
- Productivity score
- AI recommendation

---

# Tool UI States

The AI tool lifecycle is displayed using different UI states.

## Input Streaming

Shows that the AI is preparing the task analysis.

Example:

"Analyzing your tasks..."

---

## Input Available

Shows that the user's task data has been received.

Example:

"Task data received. Starting analysis."

---

## Output Available

Displays the structured productivity report using a custom React component.

The result shows:

- Task statistics
- Priority breakdown
- Productivity score
- AI recommendation

---

## Output Error

If the AI tool fails, the application displays a designed error state instead of crashing.

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## AI

- AI SDK
- OpenRouter API
- Zod schema validation
- AI tool calling

## UI

- React Markdown
- Remark GFM
- Recharts

## Storage

- Browser Local Storage

## Deployment

- Vercel
- GitHub

---

# Project Structure

```text

app/

├── ai-planner/

│   └── page.tsx

│

├── api/

│   └── chat/

│       └── route.ts

│

components/

└── ToolResultCard.tsx

hooks/

└── useLocalStorage.ts

lib/

└── ai/

    ├── config.ts

    └── tools/

        └── analyzeTasks.ts

types/

└── task.ts

```

---

---

# Setup

Install dependencies:

```bash

npm install

```

Run development server:

```bash

npm run dev

```

Open:

```

[http://localhost:3000](http://localhost:3000)

```

---

# # Environment Variables

Create a file:

```text

.env.local

```

Add:

```env

OPENROUTER_API_KEY=your_openrouter_api_key

```

Never commit `.env.local` or expose API keys publicly.

---

# AI Tool Architecture

Flow:

User asks AI about tasks

↓

AI uses the `analyzeTasks` tool

↓

Server receives task data

↓

Zod validates the input

↓

Tool calculates productivity statistics

↓

Structured result is returned

↓

React displays the productivity report component

---

# Future Improvements

- User authentication

- Database integration

- Cloud task synchronization

- Calendar integration

- Advanced AI scheduling

- More AI productivity tools

---

# Author

Built as part of the Frontend AI Engineering Internship.

