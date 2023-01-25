Ext.define('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntryCodeIATA',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCodeIATAInputSchemeUpfrontForm',
    requires:[
        'Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryCodeIATAInputSchemeUpfrontController'
    ],
    controller: 'DataEntryCodeIATAInputSchemeUpfrontController',
    title:'Search by code for IATA - SPA:',
    header:true,
//    height:580,
    width:495,
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
                    id: prototype.id+'-boxInfoA',
                    border: true,
                    layout: 'hbox',
                    bodyStyle: 'border-style:solid;border-color:#A6A6A6;border-bottom-width:4px;',
                    defaults: {
                        margin: '4 0 4 7'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search:',
                            padding: '4 0 0 0',
                            width: 60
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbIATA',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["I", "IATA"], ["N", "NAME IATA"]
                                ]
                            }),
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("I");
                                },
                                focus: function(combo) {
                                    combo.expand();
                                },
                                change: 'setClearTxt'
                            }
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-textSearchList',
                            fieldStyle: 'text-align:left;',
                            enableKeyEvents: true,
                            width: 190,
                            listeners:{
                                keypress: 'onTextSearchListKeypress'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxInfoA1',
                    border: true,
                    bodyStyle: 'border-style:solid;border-color:#A6A6A6;border-bottom-width:4px;',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridGROUPLIST">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridGROUPLIST',
                            border: true,
                            height: 400,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'IATA', dataIndex: 'A2649IATA', width: 110
                                    },
                                    {
                                        text: 'DESC.', dataIndex: 'A003KEY3', width: 243,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'ASG.', dataIndex: 'A2649KGRUP', width: 120,
                                        listeners: {
                                            click: 'selectedData'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;font-weight:bold;cursor:pointer;";
//                                            return value==="000000"?"Asign Code":"Asign Code";
                                            return "Asign IATA";
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
    dockedItems:[
    ]
});