<template>
<div>
  <div>
    <el-button type="primary" @click="openTerminal(test)">TTY2</el-button>
  </div>
  <div>
    <el-dialog v-if="dialogTerminalVisible" :title="terminal.ip" :visible.sync="dialogTerminalVisible" :close-on-click-modal="false">
      <vap-xterm :terminal="terminal" />
    </el-dialog>
  </div>
  </div>
</template>

<script>
import VapXterm from '../components/VapXterm'
import {Terminal} from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as attach from 'xterm/lib/addons/attach/attach'
Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
export default {
  components: { VapXterm, },
  data () {
    return {
      term: undefined,
      dialogTerminalVisible: false,
      test:{
        id: '10',
        ip: '10.199.88.10',
        token:this.$store.state.token,
        rows: 90,
        cols: 24
      },
      terminal: {
        id: '',
        ip: '',
        token:'',
        rows: 90,
        cols: 24
      },
    }
  },
  methods: {
    openTerminal(row) {
      this.dialogTerminalVisible = true
      this.terminal.id = row.id
      this.terminal.ip = row.ip
      this.terminal.token = row.token
      this.terminal.cols = row.cols
       this.terminal.rows = row.rows
    },
  }
   
}
</script>