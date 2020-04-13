import * as sdk from 'botpress/sdk'

const onServerStarted = async (bp: typeof sdk) => { }
const onServerReady = async (bp: typeof sdk) => { }

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  definition: {
    name: 'task-management',
    menuIcon: 'none',
    menuText: 'Task Management',
    noInterface: false,
    fullName: 'Task Management',
    homepage: 'https://kintone.com'
  }
}

export default entryPoint
