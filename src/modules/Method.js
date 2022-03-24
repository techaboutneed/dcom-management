const DIRECT_DOWNLOAD_LINK = 'https://drive.google.com/uc?export=download&id='

class rowGenerator {
  // rowMaker Object Constructor
  constructor({ subject, ref, files = null }) {
    this.subject = subject
    this.ref = ref ?? '-'
    this.files = files
  }

  //   table row generate function
  rowDivGenerator(tableName) {
    const subjectElement = document.createElement('td')
    const refElement = document.createElement('td')
    const linksElement = document.createElement('td')
    const rowElement = document.createElement('tr')
    const tableBodyElement = document.getElementById(`${tableName}Body`)

    subjectElement.innerText = this.subject
    rowElement.append(subjectElement)

    if (tableName === 'note') {
      refElement.innerText = this.ref
      rowElement.append(refElement)
    }

    if (this.files == null) rowElement.append(linksElement)

    if (this.files) {
      this.files.map((file) => {
        const linkElement = document.createElement('a')
        linkElement.classList.add('btn')

        if (file.link == null) {
          linkElement.href = '#'
          linkElement.classList.add('soonbtn')
        }

        if (file.link) linkElement.href = `${DIRECT_DOWNLOAD_LINK}${file.link}`

        linkElement.innerText = file.text ?? 'Coming Soon'

        linksElement.append(linkElement)
      })
    }

    rowElement.append(linksElement)

    tableBodyElement.append(rowElement)
  }

  static messageShow(tableName, message = 'Coming soon') {
    // Select the table parent
    const tableParentElement = document.getElementById(`${tableName}Body`)
      .parentNode.parentNode

    const divElement = document.createElement('div')

    divElement.className = 'soon'
    divElement.innerText = message

    // remove the table
    tableParentElement.children[1].remove()

    // append message instead of table
    tableParentElement.appendChild(divElement)
  }
}

// commonClass with item and tableName
function dataManage(items, tableName) {
  // Checking the item is an Array
  if (!Array.isArray(items)) return rowGenerator.messageShow(tableName, items)

  // Checking item is not empty
  if (items.length == 0) return rowGenerator.messageShow(tableName)

  // iterate the items
  for (let item of items) {
    // define new rowMaker Obj
    let itemObj = new rowGenerator(item)
    // calling the trMaker prototype function
    itemObj.rowDivGenerator(tableName)
  }
}
export default dataManage
