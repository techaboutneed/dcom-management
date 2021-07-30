class rowGenerator {
  // rowMaker Object Constructor
  constructor({ subject, ref = "-", links = [], text = [] }) {
    this.subject = subject;
    this.ref = ref;
    this.links = links;
    this.text = text;
  }

  //   table row generate function
  rowDivGenerator(tableName) {
    // declare variable linkDiv which contains single or multilinks
    let linkDiv = "";

    // check the links is more than 1
    if (this.links.length > 1) {
      // iterate links
      this.links.forEach((linkHref, index) => {
        // check the text is more than 1
        if (this.text.length > 1) {
          linkDiv += this.linkTagCreator(linkHref, index);
        } else {
          linkDiv += this.linkTagCreator(linkHref);
        }
      });
    } else if (this.links.length == 1) {
      linkDiv += this.linkTagCreator(this.links[0]);
    } else {
      if (this.text.length !== 0) linkDiv += this.linkTagCreator();
    }

    // Check whether to show ref column or not
    let columnRef = "";

    // note table only contains ref
    if (tableName == "note") {
      columnRef = `<td>${this.ref}</td>`;
    }

    // table column create
    let tableColumnHtml = `<tr>
                        <td>${this.subject}</td>
                        ${columnRef}
                        <td class="links"> ${linkDiv}</td>
                      </tr>`;
    // Select the table body
    let tableBodySelect = document.getElementById(`${tableName}Body`);

    // append tableColumnHtml in table
    tableBodySelect.innerHTML += tableColumnHtml;
  }

  linkTagCreator(linkHref = "", index = 0) {
    // declare prelink which is use to generate link
    const preLink = "https://drive.google.com/uc?export=download&id=";
    if (linkHref === "") linkHref = "#";
    if (linkHref !== "" && linkHref != "#") linkHref = preLink + linkHref;
    return `<a href="${linkHref}" class="${
      linkHref !== "" && linkHref != "#" ? `btn` : `btn soonbtn`
    }" rel="nofollow" ${linkHref !== "" && linkHref != "#" ? "download" : ""}>${
      this.text[index]
    }</a>`;
  }

  static messageShow(tableName, message = "Coming soon") {
    // Select the table parent
    let tableBodySelect = document.getElementById(`${tableName}Body`).parentNode
      .parentNode;
    // append message instead of table
    tableBodySelect.innerHTML = `<div class="soon">${message}</div>`;
  }
}

// commonClass with item and tableName
function dataManage(items, tableName) {
  // Checking the item is an Array
  if (Array.isArray(items)) {
    // Checking item is not empty
    if (items.length != 0) {
      // iterate the items
      for (let item of items) {
        // define new rowMaker Obj
        let itemObj = new rowGenerator(item);
        // calling the trMaker prototype function
        itemObj.rowDivGenerator(tableName);
      }
    } else {
      rowGenerator.messageShow(tableName);
    }
  } else {
    rowGenerator.messageShow(tableName, items);
  }
}
export default dataManage;
