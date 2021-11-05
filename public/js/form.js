
function getRefs(el) {
    let result = {};
    
    [...el.querySelectorAll('[data-ref]')]
      .forEach(ref => {
        result[ref.dataset.ref] = ref;
      });
    
    return result;
  }
  
  function getProps(el) {
    return JSON.parse(el.dataset.props);
  }
  
  function createFromHTML(html='') {
    let element = document.createElement(null);
    element.innerHTML = html;
    return element.firstElementChild;
  }
  
  function fieldRepeaterComponent(el) {
    const props = getProps(el);
    const refs = getRefs(el);
    
    let rowNumber = 1;
    
    function renderRow() {
      return `
        <li class="repeatable-field__row">
          <div class="repeatable-field__row-wrap">

          <input
                class="repeatable-field__input form-field"
                data-ref="input"
                type="text"
                name="${props.inputName}"
                aria-label="${props.labelText} #${rowNumber}"
            />
            <input
                class="repeatable-field__input form-field"
                data-ref="input"
                type="text"
                name="${props.inputName}"
                aria-label="${props.labelText} #${rowNumber}"
            />

            <input
                class="repeatable-field__input form-field"
                data-ref="input"
                type="number"
                name="${props.inputName}"
                aria-label="${props.labelText} #${rowNumber}"
            />
            
  
            <button
                class="repeatable-field__remove-button button"
                data-ref="removeButton"
                type="button"
            >
              ${props.removeLabel ?? 'Remove'}
            </button>
          </div>
        </li>
      `;
    }
    
    function updateLimitCounter() {
      const rowCount = refs.rowList.children.length;
      refs.limitCounter.innerText = `${rowCount}/${props.maxRows}`;
    }
    
    function addRow(focusInput=false) {
      if (refs.rowList.children.length >= props.maxRows)
        return;
      
      let newRow = createFromHTML(renderRow());
      const rowRefs = getRefs(newRow);
  
      rowRefs.removeButton.onclick = (e) => {
        e.preventDefault();
        removeRow(newRow);
      }
      
      refs.rowList.appendChild(newRow);
      
      if (focusInput) rowRefs.input.focus();
      
      if (refs.rowList.children.length >= props.maxRows) {
        refs.addButton.style.display = 'none';
      }
      
      rowNumber += 1;
      
      updateLimitCounter();
    }
    
    function removeRow(row) {
      if (refs.rowList.children.length <= 1)
        return;
      
      row.remove();
      el.focus();
      
      updateLimitCounter();
      
      if (refs.rowList.children.length < props.maxRows) {
        refs.addButton.style.display = '';
      }
    }
    
    function init() {
      addRow();
    }
    
    refs.addButton.onclick = (e) => {
      e.preventDefault();
      addRow(true);
    }
    
    init();
  }
  
  document.querySelectorAll('[data-component="field-repeater"]')
    .forEach(el => {
      fieldRepeaterComponent(el);
    });