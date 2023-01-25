Ext.define('Ext.Praxis.view.interline.TAXAnalysisDocumentsForm.DataEntryViewComm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryViewCommTAXAnalysisDocumentsForm',

    controller: 'DataEntryViewCommTAXAnalysisDocumentsController',

    requires: [
        'Ext.Praxis.controller.interline.TAXAnalysisDocuments.DataEntryViewCommTAXAnalysisDocumentsController'
    ],

    title: 'Search Comments',
    header: true,
    height: 400,
    width: 700,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            layout: {
                        type: 'vbox',
                        align: 'center'
                    },
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: 630,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '5 8 1 8',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Comment Code : ',
                                    style: 'font-weight:bold;',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCodigoViewComm',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 70,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSearchViewComm',
                                    style: 'font-weight:bold;background:#3ED42A;',
                                    html: '<strong style="background:#3ED42A;color:white;">Search</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Search Comments',
                                    width: 80,
                                    listeners: {
                                        click: 'btnSearch_clickHandler'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 4},
                        // <editor-fold defaultstate="collapsed" desc="gridDataViewComm">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataViewComm',
                            width: 580,
                            height: 297,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Code', dataIndex: 'A021KEY', width: 80
                                    },
                                    {
                                        text: 'Comment', dataIndex: 'strDescripcion', flex: 1,//width: 500,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
            ]
        }
    ]
});