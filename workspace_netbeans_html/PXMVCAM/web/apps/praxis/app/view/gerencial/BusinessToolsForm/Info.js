/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var controller = {
    select: function(value, row) {
        var dataStore = Ext.getCmp(prototype.id + '-gridDataColumns').getStore();
        var dataRow = dataStore.data.items[row].data;
        //console.log(dataRow);
        var name = dataRow.DESCRIPT;
        if (dataRow.select === true) {
            storeList.remove(storeList.findRecord('DESCRIPT', name));
            dataRow.select = false;
        } else {
            dataRow.select = true;
            storeList.add(dataRow);
        }
        Ext.getCmp(prototype.id + '-gridDataColumns').setStore(dataStore);
    }
};

var storeCombo = Ext.create('Ext.data.SimpleStore', {
    fields: ['code', 'name'],
    data: [
        ["", ""],
        ["ASC", "ASC"],
        ["DESC", "DESC"]
    ]
});
var storeList = Ext.create('Ext.data.SimpleStore', {
    id: prototype.id + '-storeList',
    fields: ['name'],
    data: [
    ]
});
Ext.define('Ext.Praxis.view.gerencial.BusinessToolsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1150,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                // --------------------------   PANEL COLUMNS FILTERS  ------------
                //-----------------------------------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxContenedorGrid',
                    align: 'center',
                    margin: '0 0 0 0',
                    bodyStyle: 'background: transparent',
                    border: true,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelSelectField',
                            align: 'center',
                            margin: '0 0 0 0',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataColumns',
                                    height: 555,
                                    width: 435,
                                    resizable: true,
                                    columnLines: true,
                                    viewConfig: {
                                        preserveScrollOnRefresh: true,
                                        preserveScrollOnReload: true
                                    },
                                    bufferedRenderer: true,
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.CellEditing', {
                                            clicksToEdit: 1,
                                            selectOnEdit: true,
                                            gridcellediting: true
                                        })
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Select', width: 50, dataIndex: 'select',
                                                headerCheckbox: true,
                                                renderer: function(value, meta, record, row, col) {
                                                    var check = record.data.select;
                                                    if (check) {
                                                        return '<input type="checkbox" checked  onclick="controller.select(this.checked,' + row + ')">';
                                                    } else {
                                                        return '<input type="checkbox"   onclick="controller.select(this.checked,' + row + ')">';
                                                    }
                                                }
                                            },
                                            {text: 'Field', width: 250, dataIndex: 'DESCRIPT',
                                                renderer: function(value, meta, record, row, col) {
                                                    var color = record.data['COLOR'].trim();
                                                    //console.log('LOG : **' + color + '**');
                                                    meta.style = 'text-align:left;color:' + color + ';';
                                                    return value;
                                                }
                                            },
                                            {text: 'Position', width: 60, dataIndex: 'OrderBy',
                                                renderer: function(value, meta, record, row, col) {
                                                    var check = record.data.select;
                                                    if (!check) {
                                                        meta['tdCls'] = 'x-item-disabled';
                                                    } else {
                                                        meta['tdCls'] = 'x-item-enable';
                                                    }
                                                    return value;
                                                },
                                                editor: {
                                                    xtype: 'textfield',
                                                    fieldStyle: 'text-align:center',
                                                    maskRe: /[0-9]/,
                                                    enforceMaxLength: true,
                                                    maxLength: 2

                                                }
                                            },
                                            {text: 'Order', width: 60, dataIndex: 'DownUp',
                                                renderer: function(value, meta, record, row, col) {
                                                    var check = record.data.select;
                                                    if (!check) {
                                                        meta['tdCls'] = 'x-item-disabled';
                                                    } else {
                                                        meta['tdCls'] = '';
                                                    }

//                                                    if(value==='ASC'){
//                                                        return 'A';
//                                                    }else{
//                                                        return 'D';
//                                                    }
                                                    return value;
                                                },
                                                editor: {
                                                    xtype: 'combo',
                                                    store: storeCombo,
                                                    editable: false,
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                }
                                            }
                                        ]
                                    }},
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-panelListColumns',
                                    height: 555,
                                    width: 200,
                                    resizable: true,
                                    columnLines: true,
                                    store: storeList,
                                    viewConfig: {
                                        plugins: {
                                            ptype: 'gridviewdragdrop',
                                            dragText: 'Drag and drop to reorganize'
                                        },
                                        preserveScrollOnRefresh: true,
                                        preserveScrollOnReload: true,
                                        listeners: {
                                            drop: function(node, data, dropRec, dropPosition) {
                                                var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('DESCRIPT') : ' on empty view';
                                            }
                                        }
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Field', width: 195, dataIndex: 'DESCRIPT',
                                                renderer: function(value, meta, record, row, col) {
                                                    var color = record.data['COLOR'].trim();
                                                    //console.log('LOG : **' + color + '**');
                                                    meta.style = 'text-align:left;color:' + color + ';';
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }

                                /*{
                                 xtype: 'panel',
                                 //title: 'Columns',
                                 align: 'center',
                                 margin: '20 10 0 10',
                                 bodyStyle: 'background: #E6F4FF;border: 1px solid #486A80',
                                 border: true,
                                 layout: 'hbox',
                                 items: [
                                 {
                                 xtype: 'dataview',
                                 id: prototype.id + '-panelListColumns',
                                 bodyStyle: 'background: #E6F4FF',
                                 border: true,
                                 margin: '5 5 0 5',
                                 padding: '0 5 0 5',
                                 height: 530,
                                 layout: 'fit',
                                 width: 220,
                                 cls: 'dataview-basic',
                                 itemTpl: '<div > <li style="color:#244066">{DESCRIPT}</li></div>',
                                 store: storeList
                                 }
                                 ]
                                 }*/
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelResult',
                            align: 'center',
                            margin: '0 0 0 0',
                            bodyStyle: 'background-color: #E3EAEF;  align: center',
                            border: false,
                            layout: 'vbox',
                            items: [
//                                {
//                                    xtype: 'grid',
//                                    padding: '20 0 0 0',
//                                    align: 'center',
//                                    id: prototype.id + '-gridData',
//                                    bodyStyle: 'background-color: #E3EAEF;',
//                                    height: 525,
//                                    width: 500,
//                                    resizable: true,
//                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary',
//                                            dock: 'bottom'
//                                        }],
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            align: 'center',
//                                            text: 'Column',
//                                            width: 100,
//                                            hidden: true
//                                        },
//                                        items: [
//                                            {dataIndex: 'column1', id: prototype.id + '-campo1',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[0].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 1) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot1, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//
//                                                }},
//                                            {dataIndex: 'column2', id: prototype.id + '-campo2',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[1].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 2) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot2, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column3', id: prototype.id + '-campo3',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[2].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 3) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot3, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column4', id: prototype.id + '-campo4',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[3].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 4) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot4, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column5', id: prototype.id + '-campo5',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[4].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 5) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot5, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column6', id: prototype.id + '-campo6',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[5].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 6) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot6, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column7', id: prototype.id + '-campo7',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[6].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 7) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot7, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column8', id: prototype.id + '-campo8',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[7].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 8) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot8, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column9', id: prototype.id + '-campo9',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[8].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 9) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot9, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column10', id: prototype.id + '-campo10',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[9].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 10) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot10, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column11', id: prototype.id + '-campo11',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[10].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 11) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot11, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column12', id: prototype.id + '-campo12',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[11].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 12) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot12, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column13', id: prototype.id + '-campo13',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[12].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 13) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot13, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column14', id: prototype.id + '-campo14',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[13].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 14) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot14, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column15', id: prototype.id + '-campo15',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[14].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 15) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot15, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column16', id: prototype.id + '-campo16',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[15].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 16) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot16, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column17', id: prototype.id + '-campo17',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[16].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 17) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot17, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column18', id: prototype.id + '-campo18',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[17].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 18) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot18, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column19', id: prototype.id + '-campo19',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[18].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 19) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot19, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column20', id: prototype.id + '-campo20',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[19].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 20) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot20, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column21', id: prototype.id + '-campo21',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[20].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 21) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot21, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column22', id: prototype.id + '-campo22',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[21].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 22) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot22, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column23', id: prototype.id + '-campo23',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[22].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 23) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot23, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column24', id: prototype.id + '-campo24',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[23].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 24) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot24, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column25', id: prototype.id + '-campo25',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[24].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 25) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot25, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column26', id: prototype.id + '-campo26',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[25].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 26) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot26, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column27', id: prototype.id + '-campo27',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[26].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 27) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot27, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column28', id: prototype.id + '-campo28',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[27].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 28) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot28, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column29', id: prototype.id + '-campo29',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[28].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 29) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot29, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column30', id: prototype.id + '-campo30',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[29].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 30) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot30, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column31', id: prototype.id + '-campo31',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[30].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 31) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot31, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column32', id: prototype.id + '-campo32',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[31].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 32) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot32, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column33', id: prototype.id + '-campo33',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[32].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 33) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot33, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column34', id: prototype.id + '-campo34',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[33].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 34) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot34, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column35', id: prototype.id + '-campo35',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[34].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 35) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot35, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column36', id: prototype.id + '-campo36',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[35].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 36) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot36, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column37', id: prototype.id + '-campo37',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[36].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 37) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot37, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column38', id: prototype.id + '-campo38',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[37].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 38) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot38, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column39', id: prototype.id + '-campo39',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[38].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 39) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot39, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column40', id: prototype.id + '-campo40',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[39].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 40) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot40, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column41', id: prototype.id + '-campo41',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[40].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 41) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot41, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column42', id: prototype.id + '-campo42',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[41].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 42) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot42, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column43', id: prototype.id + '-campo43',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[42].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 43) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot43, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column44', id: prototype.id + '-campo44',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[43].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 44) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot44, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column45', id: prototype.id + '-campo45',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[44].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 45) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot45, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column46', id: prototype.id + '-campo46',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[45].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 46) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot46, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column47', id: prototype.id + '-campo47',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[46].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 47) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot47, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column48', id: prototype.id + '-campo48',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[47].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 48) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot48, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column49', id: prototype.id + '-campo49',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[48].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 49) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot49, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column50', id: prototype.id + '-campo50',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[49].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 50) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot50, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column51', id: prototype.id + '-campo51',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[50].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 51) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot51, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column52', id: prototype.id + '-campo52',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[51].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 52) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot52, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column53', id: prototype.id + '-campo53',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[52].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 53) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot53, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column54', id: prototype.id + '-campo54',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[53].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 54) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot54, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column55', id: prototype.id + '-campo55',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[54].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 55) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot55, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column56', id: prototype.id + '-campo56',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[55].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 56) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot56, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column57', id: prototype.id + '-campo57',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[56].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 57) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot57, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column58', id: prototype.id + '-campo58',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[57].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 58) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot58, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column59', id: prototype.id + '-campo59',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[58].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 59) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot59, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column60', id: prototype.id + '-campo60',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[59].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 60) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot60, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column61', id: prototype.id + '-campo61',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[60].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 61) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot61, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column62', id: prototype.id + '-campo62',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[61].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 62) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot62, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'column63', id: prototype.id + '-campo63',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                    //metaData.style = 'text-align:right; margin-right:3px ';
//                                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[62].data;
//                                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
//                                                    if (total_campos >= 63) {
//                                                        if (fields.DATATYPE == 'N') {
//                                                            return '<b>' + Ext.util.Format.number(data.tot63, '0,000') + '<b>';
//                                                        } else {
//                                                            return value;
//                                                        }
//                                                    }
//                                                }},
//                                            {dataIndex: 'QTY', id: prototype.id + '-QTY'}
//
//                                        ]
//                                    }
//                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelLabelPagination',
                                    align: 'center',
                                    margin: '5 0 0 0',
                                    bodyStyle: 'background: transparent',
                                    border: true,
                                    hidden: true,
                                    layout: 'hbox',
                                    items: [
                                        /** PAGINATION LABELS*/
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true,
                                                padding: '0px 1px 0px 1px'
                                            },
                                            padding: '1px 1px 1px 1px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-piePanel',
                                                    width: '100%',
                                                    height: 25,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label',
                                                        margin: '3px 0px 0px 5px'
                                                    }, items: [
                                                        {
                                                            text: 'Page',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-currentPage',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total',
                                                            text: '0', width: 100
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }

            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

