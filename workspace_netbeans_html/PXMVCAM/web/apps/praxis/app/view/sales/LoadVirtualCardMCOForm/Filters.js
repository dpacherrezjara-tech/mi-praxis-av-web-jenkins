Ext.define('Ext.Praxis.view.sales.LoadVirtualCardMCOForm.Filters', {
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
            padding: '2px 5px 2px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">SEARCH BY</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'TYPE:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbtINDAC',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["U", "Upfront"],
                            ["B", "Backend"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 100,
                    hiddenLabel: false
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'VIRTUAL CARD:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-TXT_VIRTUAL_CARD_SEARCH',
                    fieldStyle: 'text-align:left',
                    enforceMaxLength: true,
                    maxLength: 20,
                    width: 154
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id+'-CHECK_ENCRIPT_SEARCH',
                    boxLabel: 'MASK',
                    checked: true
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id + '-pnlRutaExcel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    items:[
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-txtRutaExcel',
                            fieldLabel: 'Upload File Format:',
                            labelWidth: 120,
                            allowBlank: true,
                            accept: '.xlsx, .xls, .csv',
                            margin: '2 4 2 4',
                            width: 400,
                            listeners:{
                                change: 'onUploadChange'
                            },
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only CSV, XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text : '<strong>Upload</strong>',
                                width: 80,
//                                cls: 'x-btn-upload x-btn-upload-txt',
//                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                            }
                        },
                        {
                            xtype: 'button',
                            id:prototype.id+'-btnSaveFilter',
                            html: '<strong>Save</strong>',
                            border: true,
                            margin: '2 0 2 0',
                            width: 80,
                            listeners:{
                                click: 'onSaveFilterClick'
                            }
                        }
                    ]
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id+'-CHECK_ERROR_SEARCH',
                    boxLabel: 'ERROR(0)',
                    checked: false,
                    width: 94,
                    listeners:{
                        change: 'onCHECK_ERROR_SEARCHChange'
                    }
                }
            ]
        }
    ]
});

