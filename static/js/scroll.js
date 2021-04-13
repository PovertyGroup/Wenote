(function () {
  let initTop = 0

  const scrollElement = document.querySelector('.el-scrollbar__wrap')
  const headerElement = document.querySelector('.header')

  scrollElement.addEventListener('scroll', () => {
    const currentTop = scrollElement.scrollTop
    if (currentTop > initTop) {
      // scroll down
      headerElement.classList.remove('visible')
    } else if (currentTop < initTop) {
      // scroll up
      headerElement.classList.add('visible')
    }
    initTop = currentTop
  })
})()
