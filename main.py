import gradio as gr
import requests,json
from rich import inspect

def chat(message,history,name):
    payload = {
  "name": name,
  "description": "string",
  "phone": 0,
  "content": message,
}
    content = requests.post('http://127.0.0.1:8000/chat/', data=json.dumps(payload))
    inspect(content)
    text = content.text.replace('\n', '<br/>')
    return text

demo = gr.ChatInterface(chat,title="用药咨询",additional_inputs=[
                            gr.Textbox("23B03725680",label="user_name")
                        ])

if __name__ == "__main__":
    demo.launch(debug = True,server_name="0.0.0.0",server_port=8110)
