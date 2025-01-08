import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { input_value, langflowId, flowId, applicationToken } =
      await request.json();

    const response = await axios.post(
      `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowId}`,
      {
        input_value: input_value,
        input_type: "chat",
        output_type: "chat",
        tweaks: {
          "ChatInput-Uwwvb": {},
          "ParseData-4Sb3V": {},
          "Prompt-ZgxaM": {},
          "SplitText-nOYZS": {},
          "ChatOutput-5quGo": {},
          "AstraDB-uQPjR": {},
          "AstraDB-0uLmd": {},
          "File-7PLSY": {},
          "AzureOpenAIEmbeddings-Lp3gW": {},
          "AzureOpenAIEmbeddings-7xuTF": {},
          "GroqModel-4Sn1l": {},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${applicationToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, details: error.response?.data },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
