import { tool } from "ai";
import { z } from "zod";

export const analyzeTasks = tool({

  description:
    "Analyze the user's current tasks and provide productivity statistics.",

  inputSchema: z.object({
    tasks: z.array(
      z.object({
        title: z.string(),
        completed: z.boolean(),
        priority: z.enum([
          "High",
          "Medium",
          "Low",
        ]),
      })
    ),
  }),


  execute: async ({ tasks }) => {
   
    const total = tasks.length;


    const completed = tasks.filter(
      (task) => task.completed
    ).length;


    const pending = total - completed;


    const high = tasks.filter(
      (task) => task.priority === "High"
    ).length;


    const medium = tasks.filter(
      (task) => task.priority === "Medium"
    ).length;


    const low = tasks.filter(
      (task) => task.priority === "Low"
    ).length;


    const productivityScore =
      total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          );


    let recommendation = "";

    if (pending === 0 && total > 0) {

      recommendation =
        "Excellent work! All tasks are completed.";

    } else if (high > 0) {

      recommendation =
        "Focus on completing your high-priority tasks first.";

    } else if (pending > completed) {

      recommendation =
        "Try completing a few pending tasks today.";

    } else {

      recommendation =
        "You're making steady progress. Keep it up!";

    }


    return {
      total,
      completed,
      pending,
      high,
      medium,
      low,
      productivityScore,
      recommendation,
    };

  },

});