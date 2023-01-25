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
Ext.define('Ext.Praxis.view.salesaudit.AuditTwForm.Info', {
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
                                                    meta.style = 'text-align:left;color:'+color+';';
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
                                    }
                                },  
                                
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
                                                    meta.style = 'text-align:left;color:'+color+';';
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
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    align: 'center',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 525,
                                    width: 500,
                                    resizable: true,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            text: 'Column',
                                            width: 100,
                                            hidden: true
                                        },
                                        items: [
                                            {dataIndex: 'column1', id: prototype.id + '-campo1'},
                                            {dataIndex: 'column2', id: prototype.id + '-campo2'},
                                            {dataIndex: 'column3', id: prototype.id + '-campo3'},
                                            {dataIndex: 'column4', id: prototype.id + '-campo4'},
                                            {dataIndex: 'column5', id: prototype.id + '-campo5'},
                                            {dataIndex: 'column6', id: prototype.id + '-campo6'},
                                            {dataIndex: 'column7', id: prototype.id + '-campo7'},
                                            {dataIndex: 'column8', id: prototype.id + '-campo8'},
                                            {dataIndex: 'column9', id: prototype.id + '-campo9'},
                                            {dataIndex: 'column10', id: prototype.id + '-campo10'},
                                            {dataIndex: 'column11', id: prototype.id + '-campo11'},
                                            {dataIndex: 'column12', id: prototype.id + '-campo12'},
                                            {dataIndex: 'column13', id: prototype.id + '-campo13'},
                                            {dataIndex: 'column14', id: prototype.id + '-campo14'},
                                            {dataIndex: 'column15', id: prototype.id + '-campo15'},
                                            {dataIndex: 'column16', id: prototype.id + '-campo16'},
                                            {dataIndex: 'column17', id: prototype.id + '-campo17'},
                                            {dataIndex: 'column18', id: prototype.id + '-campo18'},
                                            {dataIndex: 'column19', id: prototype.id + '-campo19'},
                                            {dataIndex: 'column20', id: prototype.id + '-campo20'},
                                            {dataIndex: 'column21', id: prototype.id + '-campo21'},
                                            {dataIndex: 'column22', id: prototype.id + '-campo22'},
                                            {dataIndex: 'column23', id: prototype.id + '-campo23'},
                                            {dataIndex: 'column24', id: prototype.id + '-campo24'},
                                            {dataIndex: 'column25', id: prototype.id + '-campo25'},
                                            {dataIndex: 'column26', id: prototype.id + '-campo26'},
                                            {dataIndex: 'column27', id: prototype.id + '-campo27'},
                                            {dataIndex: 'column28', id: prototype.id + '-campo28'},
                                            {dataIndex: 'column29', id: prototype.id + '-campo29'},
                                            {dataIndex: 'column30', id: prototype.id + '-campo30'},
                                            {dataIndex: 'column31', id: prototype.id + '-campo31'},
                                            {dataIndex: 'column32', id: prototype.id + '-campo32'},
                                            {dataIndex: 'column33', id: prototype.id + '-campo33'},
                                            {dataIndex: 'column34', id: prototype.id + '-campo34'},
                                            {dataIndex: 'column35', id: prototype.id + '-campo35'},
                                            {dataIndex: 'column36', id: prototype.id + '-campo36'},
                                            {dataIndex: 'column37', id: prototype.id + '-campo37'},
                                            {dataIndex: 'column38', id: prototype.id + '-campo38'},
                                            {dataIndex: 'column39', id: prototype.id + '-campo39'},
                                            {dataIndex: 'column40', id: prototype.id + '-campo40'},
                                            {dataIndex: 'column41', id: prototype.id + '-campo41'},
                                            {dataIndex: 'column42', id: prototype.id + '-campo42'},
                                            {dataIndex: 'column43', id: prototype.id + '-campo43'},
                                            {dataIndex: 'column44', id: prototype.id + '-campo44'},
                                            {dataIndex: 'column45', id: prototype.id + '-campo45'},
                                            {dataIndex: 'column46', id: prototype.id + '-campo46'},
                                            {dataIndex: 'column47', id: prototype.id + '-campo47'},
                                            {dataIndex: 'column48', id: prototype.id + '-campo48'},
                                            {dataIndex: 'column49', id: prototype.id + '-campo49'},
                                            {dataIndex: 'column50', id: prototype.id + '-campo50'},
                                            {dataIndex: 'column51', id: prototype.id + '-campo51'},
                                            {dataIndex: 'column52', id: prototype.id + '-campo52'},
                                            {dataIndex: 'column53', id: prototype.id + '-campo53'},
                                            {dataIndex: 'column54', id: prototype.id + '-campo54'},
                                            {dataIndex: 'column55', id: prototype.id + '-campo55'},
                                            {dataIndex: 'column56', id: prototype.id + '-campo56'},
                                            {dataIndex: 'column57', id: prototype.id + '-campo57'},
                                            {dataIndex: 'column58', id: prototype.id + '-campo58'},
                                            {dataIndex: 'column59', id: prototype.id + '-campo59'},
                                            {dataIndex: 'column60', id: prototype.id + '-campo60'},
                                            {dataIndex: 'column60', id: prototype.id + '-campo61'},
                                            {dataIndex: 'column60', id: prototype.id + '-campo62'},
                                            {dataIndex: 'column60', id: prototype.id + '-campo63'},
                                            {dataIndex: 'QTY', id: prototype.id + '-QTY'}

                                        ]
                                    }
                                },
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
                                                            text: '0', width: 50
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

