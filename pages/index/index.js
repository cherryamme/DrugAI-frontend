// index.js
// 获取应用实例
const app = getApp()
let currentContent = ''
let requestTask = null
Page({
    data: {
        canIUseGetUserProfile: false,
        userName: '',
        inputValue: '',
        fixedTop: 15,
        contentHeight: 188,
        thinking: false,
        loading: false,
        currentItem: 'bottom',
        messageList: [{
            id: 1,
            role: 'assistant',
            content: "您好，我是 chatBGI 机器人，请问您想了解什么？"
        }],
    },
    onLoad() {
        // var username = wx.getStorageSync('username') || '';
        // if (!username) {
        //     wx.showModal({
        //         editable:true,
        //         title: '请输入咨询用户名',
        //         content: '23B03725680',
        //         success: (res)=> {
        //             if (res.confirm) {
        //                 console.log(res)
        //                 this.setData({userName:res.content})
        //             }
        //         }
        //     })
        // };
        // this.setData({
        //     messageList: [{
        //         id: 1,
        //         role: 'assistant',
        //         content: `${this.data.userName} 您好，我是 chatBGI 机器人，请问您想了解什么？`
        //     }]
        // }, )

    },
    clearMessage() {
        if (this.data.loading || this.data.thinking) return
        this.setData({
            messageList: [],
        })
    },
    async handleSendClick() {
        const userInput = this.data.inputValue.trim()
        if (userInput.trim() === '') return
        const messageList = this.data.messageList
        const timestamp = Date.now();
        const newMessage = {
            id: timestamp,
            role: 'user',
            content: userInput
        }
        this.setData({
            messageList: messageList.concat(newMessage),
            inputValue: '',
            loading: true,
            thinking: true
        })
        this.requestWithMessage(userInput)
        // this.mock_requestWithMessage()
    },
    requestWithMessage(userInput) {
        let messages = {
            "name": "23B03725680",
            "description": "string",
            "phone": "0",
            "content": userInput,
        }
        requestTask = wx.request({
            // url: `${baseUrl}/GPT4/chat/completions?api-version=${apiVersion}`,
            url: `https://chat.bgi.com/drugai/chat/`,
            data: messages,
            method: 'POST',
            responseType: 'text',
            header: {
                'content-type': 'application/json',
                // 'api-key': `${OPEN_API_KEY}`,
            },
            success: async (res) => {
                console.log(res)
                const result = res.data;
                if (result) {
                    const timestamp = Date.now();
                    const index = this.data.messageList.length
                    const newMessageList = `messageList[${index}]`
                    const contentCharArr = result.trim().split("")
                    const content_key = `messageList[${index}].content`
                    const finished_key = `messageList[${index}].finished`
                    this.setData({
                        thinking: false,
                        [newMessageList]: {
                            id: timestamp,
                            role: 'assistant',
                            finished: false
                        }
                    })
                    currentContent = ''
                    this.show_text(0, content_key, finished_key, contentCharArr);
                } else {
                    this.setData({
                        thinking: false,
                        loading: false
                    })
                    wx.showToast({
                        icon: 'none',
                        title: '系统繁忙，请重试',
                    })
                }
            },
            fail: (err) => {
                wx.showToast({
                    icon: 'none',
                    title: `服务请求错误`,
                })
                this.setData({
                    thinking: false,
                    loading: false
                })
            }
        });
    },
    mock_requestWithMessage() {
        const timestamp = Date.now();
        const index = this.data.messageList.length
        const newMessageList = `messageList[${index}]`
        const contentCharArr = "hahahahah 我收到了啦"
        const content_key = `messageList[${index}].content`
        const finished_key = `messageList[${index}].finished`
        this.setData({
            thinking: false,
            [newMessageList]: {
                id: timestamp,
                role: 'assistant',
                finished: false
            }
        })
        currentContent = ''
        this.show_text(0, content_key, finished_key, contentCharArr);
        this.setData({
            currentItem: "bottom"
        })
    },


    show_text(key = 0, content_key, finished_key, value) {
        if (key >= value.length) {
            this.setData({
                loading: false,
                [finished_key]: true
            })
            wx.vibrateShort()
            return;
        }
        currentContent = currentContent + value[key]
        this.setData({
            [content_key]: currentContent,
        })
        setTimeout(() => {
            this.show_text(key + 1, content_key, finished_key, value);
        }, 50);
    },
})