<template>
  <div id="terminal" />
</template>

<script>
import { Terminal } from 'xterm'
import 'xterm/dist/xterm.css'
import * as fit from 'xterm/dist/addons/fit/fit'
import * as attach from 'xterm/lib/addons/attach/attach'
Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
let defaultTheme = {
    foreground: "#ffffff",
    background: "#1b212f",
    cursor: "#ffffff",
    selection: "rgba(255, 255, 255, 0.3)",
    black: "#000000",
    brightBlack: "#808080",
    red: "#ce2f2b",
    brightRed: "#f44a47",
    green: "#00b976",
    brightGreen: "#05d289",
    yellow: "#e0d500",
    brightYellow: "#f4f628",
    magenta: "#bd37bc",
    brightMagenta: "#d86cd8",
    blue: "#1d6fca",
    brightBlue: "#358bed",
    cyan: "#00a8cf",
    brightCyan: "#19b8dd",
    white: "#e5e5e5",
    brightWhite: "#ffffff"
};
export default {
  name: 'Terminal',
  props: {
    terminal: {
        type: Object,
        default: () => {}
    }
  },
  data() {
    return {
        term: null,
        websocket: null,//建立的连接
        lockReconnect: false,//是否真正建立连接
        timeout: 28*1000,//30秒一次心跳
        timeoutObj: null,//心跳心跳倒计时
        serverTimeoutObj: null,//心跳倒计时
        timeoutnum: null,//断开 重连倒计时
    }
  },
  created() {
        //页面刚进入时开启长连接
        this.initWebSocket()
  },
  mounted() {
        this.initTerm()
  },
  beforeDestroy() {
    if (this.term) {
        this.term.dispose()
    }
    if (this.websocket) {
        this.destroyed()                  //离开路由之后断开websocket连接
    }
  },
  methods: {
    initWebSocket() {
        this.websocket = new WebSocket(`ws://localhost:3000/api/v1/ws/${this.terminal.id}&token=${this.terminal.token}&cols=${this.terminal.cols}&rows=${this.terminal.rows}`)
        this.websocket.onopen = this.onopen;   //连接成功
        this.websocket.onerror = this.onerror;    //连接断开，失败
        this.websocket.onclose = this.onclose;    //连接关闭
    },
    initTerm() {
        const terminalContainer = document.getElementById('terminal')
        this.term = new Terminal({
            rows: this.rows,
            cols: this.cols,
            fontSize: 18,
            cursorBlink: true,
            cursorStyle: 'bar',
            bellStyle: "sound",
            theme: defaultTheme
        })
        this.term.open(terminalContainer)
        this.term.attach(this.websocket)
        this.term.fit()
    },
    onopen(event) {
        this.$msg("success", event.data);
        this.$msg("success", "open websocket");
    },
    onerror(event) {
        this.$msg("error", event.data);
        this.reconnect();
    },
    onclose(event) {
        this.$msg("success", event.data);
        this.reconnect();
    },
    reconnect(){
        if(this.lockReconnect){       //这里很关键，因为连接失败之后之后会相继触发 连接关闭，不然会连接上两个 WebSocket
            return
        }
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        this.reconnectData && clearTimeout(this.reconnectData);
        this.reconnectData = setTimeout(()=>{
            this.initWebSocket();
            this.lockReconnect = false;
        },5000)
    },
    start(){//开启心跳
        var self = this;
        self.timeoutObj && clearTimeout(self.timeoutObj);
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
        self.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            if (self.websocket.readyState == 1) {//如果连接正常
                self.websocket.send("heartCheck");
            }else{//否则重连
                self.reconnect();
            }
            self.serverTimeoutObj = setTimeout(function() {
                //超时关闭
                self.websocket.close();
            }, self.timeout);
        }, self.timeout)
    },
    destroyed() {
        this.lockReconnect = true;
        this.websocket.close()                  //离开路由之后断开websocket连接
        clearTimeout(this.reconnectData);      //离开清除 timeout
        clearTimeout(this.timeoutObj);         //离开清除 timeout
        clearTimeout(this.serverTimeoutObj);   //离开清除 timeout
    }
  }
}
</script>

<style>
#terminal {
  margin: -30px -20px;
}
.xterm .xterm-viewport {
  overflow-y: auto;
}
</style>