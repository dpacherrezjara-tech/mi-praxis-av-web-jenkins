Ext.define('Ext.Praxis.view.payments.TerminalsCatalogForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
//                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Terminal :',
                    padding: '7 0 0 20',
                    width: 80,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtTERMP',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 8,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarCAGENCY'
                    }
                },
                {
                    xtype: 'label',
                    text: 'Agent :',
                    padding: '7 0 0 20',
                    width: 65,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSAGENT',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 8,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarCAGENCY'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Currency ',
                    id: prototype.id + '-cmbCode',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A005KEY',
                    displayField: 'A005KEY2',
                    emptyText: 'All',
                    maxLength: 3,
                    labelWidth: 120,
                    width: 180,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id + '-cmbCountry',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    width: 350,
                    labelWidth: 80,
                    hidden: true,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id + '-cmbBank',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    width: 240,
                    labelWidth: 80,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'label',
                    text: 'Bussines:',
                    padding: '8 0 0 20',
                    hidden: true,
                    width: 80
                },
//                {xtype: 'tbspacer', width: 80},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbNEGOC',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 111},
                    width: 100,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    hidden: true,
                    triggerAction: 'all',
                },
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-cargaTerminals',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 20',
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
                            id: prototype.id + '-formTerminals',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{

                                    xtype: 'filefield',
                                    id: prototype.id + '-file',
                                    name: 'excelfile',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 400,
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
                            id: prototype.id + '-btn_CargaTerminals',
                            margin: '1 0 0 0',
                            html: '<strong style="color:white;">LOAD</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onLoadClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



