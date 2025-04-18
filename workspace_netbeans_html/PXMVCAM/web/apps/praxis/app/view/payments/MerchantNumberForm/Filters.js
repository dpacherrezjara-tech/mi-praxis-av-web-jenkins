Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '8px 0 5px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Merchant:',
                    width: 60,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 16,
                    width: 110,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    text: 'Branch Merchant:',
                    width: 100,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtBMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 16,
                    width: 120,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    text: 'Credit Card Code:',
                    width: 100,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCardType',
                    disabled: false,
                    width: 150,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODE',
                    displayField: 'NAME',
                    hidden: false,
                    hiddenLabel: false,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    text: 'Country:',
                    width: 50,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 150,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'label',
                    text: 'Processor:',
                    width: 60,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    width: 130,
                    emptyText: 'All',
                    displayField: 'NAME',
                    valueField: 'VALUE',
                    queryMode: 'local',
                    editable: true,
                    forceSelection: true,
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-cargaMerchant',
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.id + '-formMerchant',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{

                                    xtype: 'filefield',
                                    id: prototype.id + '-file',
                                    name: 'excelfile',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 300,
                                    buttonAlign: 'left',
                                    buttonText: 'Select excel...',
                                    regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                    regexText: 'Only XLS and XLSX formats are accepted',
                                    buttonConfig: {
                                        text: '<strong>Select</strong>',
                                        width: 80,
                                        style: 'margin-right: 10px;'
                                    },
                                    listeners: {
                                        //change: 'onUploadChange'
                                    }
                                }]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn_CargaMerchant',
                            margin: '1 0 0 0',
                            html: '<strong style="color:white;">LOAD</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onLoadClick'
                            }
                        },
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkViewHistoric',
                    boxLabel: 'View Historic',
                    name: 'validationOption',
                    inputValue: '1',
                    uncheckedValue: '0',
                    listeners: {
                        change: 'btnSearch_clickHistoric' 
                    }
                },
                {
                    xtype: 'label',
                    html: '<strong>Cta Bank:</strong>',
                    padding: '7 0 0 10',
                    width: 87,
                    hidden: true,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCTABANK',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 15,
                    hidden: true,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
            ]
        }
    ]
});



