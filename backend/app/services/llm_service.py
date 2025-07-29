import os
from openai import OpenAI
from typing import List

def call_openai(system_prompt: str, user_message: str, history: List = None) -> str:
  
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    messages = [{"role": "system", "content": system_prompt}]

    if history:
        messages += [{"role": msg.role, "content": msg.content} for msg in history]

    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="gpt-4",  
        messages=messages,
        temperature=0.3,
        max_tokens=500
    )

    return response.choices[0].message.content.strip()
