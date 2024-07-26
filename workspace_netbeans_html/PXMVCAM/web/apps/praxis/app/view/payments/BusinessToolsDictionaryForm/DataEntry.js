Ext.define('Ext.Praxis.view.payments.BusinessToolsDictionaryForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBusinessToolsDictionaryForm',
    requires:[
        'Ext.Praxis.controller.payments.BusinessToolsDictionary.DataEntryBusinessToolsDictionaryController'
    ],
    controller: 'DataEntryBusinessToolsDictionaryController',
    title:'Business Tools Dictionary - Data Entry Form',
    header:true,
    height:700,
    width:700,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
    {
        xtype: 'form',
        defaults:{
            style: 'margin: 3px;',
            border: false
        },
        items:[
            {
                xtype: 'panel',
                bodyStyle: 'background: transparent;',
                layout: 'vbox',
                width: 1090,
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {   
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        //bodyStyle: 'background:#E5ECEF;',
                        margin: '10 2 2 30',
                        defaults: {
                            anchor: '100%',
                            width: 1080
                        },
                        items: [                                                       
                            { xtype: 'tbspacer', width: 7 },
                            {
                                xtype: 'label',
                                text: 'Business Tools Dictionary Information',
                                style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                width: 300,
                                height: 30
                            },
                            { xtype: 'tbspacer', width: 786 }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        //bodyStyle: 'background:#E5ECEF;',
                        margin: '0 2 10 30',
                        defaults: {
                            anchor: '100%',
                            width: 1080
                        },
                        items: [                                                       
                            { xtype: 'tbspacer', width: 7 },
                            {
                                xtype: 'label',
                                text: 'Table Name:',
                                style: 'font-weight:bold;color:#0B333C;',
                                width: 80
                            },
                            { xtype: 'tbspacer', width: 10 },
                            {
                                xtype: 'textfield',
                                id: prototype.id + '-de-txtTABNAME',
                                fieldStyle: 'text-align:center',
                                enforceMaxLength: true,
                                editable: false,
                                enabled: false,
                                maskRe: /[0-9a-zA-Z]/,
                                maxLength: 10,
                                readOnly: false,
                                width: 100
                            },
                            { xtype: 'tbspacer', width: 17 },
                            {
                                xtype: 'label',
                                text: 'Description:',
                                id: prototype.id + '-de-txtDes',
                                hidden:true,
                                style: 'font-weight:bold;color:#0B333C;',
                                width: 80
                            },
                            { xtype: 'tbspacer', width: 10 },
                            {
                                xtype: 'textfield',
                                id: prototype.id + '-de-txtDESCRIPT',
                                fieldStyle: 'text-align:center',
                                enforceMaxLength: true,
                                hidden:true,
                                editable: false,
                                enabled: false,
//                                maskRe: /[0-9a-zA-Z]/,
                                maxLength: 40,
                                readOnly: false,
                                width: 200
                            }
                        ]
                    },
                    {
                        xtype: 'grid',
                        id: prototype.id + '-gridDataAirport2',
                        height: 510,
                        width: 580,
                        hidden: false,
                        margin: '4 4 4 55',
                        columnLines: true,
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            items: [
                                {text: 'Description', dataIndex: 'DESCRIPT', width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:left;";
                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                        metaData.unselectableAttr = "unselectable='off'";
                                        return value;
                                    }
                                },
                                {text: 'Field', dataIndex: 'SYSTFIELD', width: 110,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:left;";
                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                        metaData.unselectableAttr = "unselectable='off'";
                                        return value;
                                    }
                                },
                                {text: 'Lenght', dataIndex: 'LENGHTF', width: 70,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;";
                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                        metaData.unselectableAttr = "unselectable='off'";
                                        if(value === '0'){
                                            value = '';
                                        }
                                        return value;
                                    }
                                },
                                {text: 'Data Type', dataIndex: 'DATATYPE', width: 90,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:left;";
                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                        metaData.unselectableAttr = "unselectable='off'";
                                        if(value === '4'){
                                            value = '';
                                        }else if(value === 'A'){
                                            value = 'Alphanumeric';
                                        }else if(value === 'D'){
                                            value = 'Date';
                                        }else if(value === 'N'){
                                            value = 'Numeric';
                                        }
                                        return value;
                                    }
                                },
                                {text: 'Order', dataIndex: 'ORDERSEL', width: 80,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;";
                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                        metaData.unselectableAttr = "unselectable='off'";
                                        if(value === '0'){
                                            value = '';
                                        }
                                        return value;
                                    }
                                },
                                {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 65,
                                        text: 'Edit',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onViewDetailClick'
                                            }
                                        ]
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
],
dockedItems:[
    {
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        margin: '10 0 10 0',
        layout:{
            pack: 'center'
        },
        fieldStyle: 'text-align:center',
        defaults:{
            scale: 'medium'
        },
        items:[
            {
                text: 'Save',
                id: prototype.id + '-btn-save',
                iconCls: 'prx-icon-save',
                listeners:{
                    click: 'onSaveClick'
                }
            },
            {
                text: 'Update',
                id: prototype.id + '-btn-update',
                iconCls: 'prx-icon-update',
                listeners:{
                    click: 'onUpdateClick'
                }
            },
            {
                text: 'Delete',
                id: prototype.id + '-btn-delete',
                iconCls: 'prx-icon-delete',
                listeners:{
                    click: 'onDeleteClick'
                }
            },
            {
                text: 'Cancel',
                id: prototype.id + '-btn-cancel',
                iconCls: 'prx-icon-cancel',
                listeners:{
                    click: 'onCancelClick'
                }
            }
        ]
    }
]

  }
);