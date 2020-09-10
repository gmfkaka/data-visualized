const getComponent = modules => () => import(`./${modules}`)

export const layoutView = getComponent('layoutView')
