export default url => {
    let aDom = document.createElement('a')
    aDom.setAttribute('href', url)
    aDom.setAttribute('target', '_blank')
    aDom.click()
}
