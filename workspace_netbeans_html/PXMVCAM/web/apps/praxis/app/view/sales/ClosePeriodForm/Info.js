var comboStore = Ext.create('Ext.data.SimpleStore', {
    fields: ['id', 'label'],
    data: [
        ["1", "Close"], ["0", "Open"]
    ]
});
Ext.define('Ext.Praxis.view.sales.ClosePeriodForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 647,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 520,
                            columnLines: true,
                            selModel: {
                                selType: 'cellmodel'
                            },
                            plugins: [
                                // <editor-fold defaultstate="collapsed" desc="CellEditing">
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1,
                                    listeners: {
                                        beforeedit: function(e, editor){// [0]: Open (Habilitado return true), [1]: Close (No habilitado return false)
                                            var store = e.grid.getStore();
                                            var indexSelected = editor.rowIdx;
                                            var modified = store.getModifiedRecords();
                                            if(!Ext.isEmpty(modified)) {
                                                for (var i = 0; i < modified.length; i++) {
                                                    var id = modified[i].id;
//                                                    var STVAL_new = modified[i].data.STVAL;
                                                    var indexModificated = Number(id.substring(id.indexOf('-')+1, id.length)) - 1;
                                                    if (indexSelected===indexModificated) {
                                                        var STVAL_old = modified[i].modified.STVAL;
                                                        if (Number(STVAL_old)===0) return true;
                                                    } else if (Number(editor.value)===1) return false; // Fila no modificada, se evalua si
                                                    else return true; // Columna 'Comment 1'
                                                }
                                            } else if (Number(editor.value)===1) return false;
                                            else return true; // Columna 'Comment 1'
                                        }
                                    }
                                })
                                // </editor-fold>
                            ],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 120
                                            }
                                        ]
                                    },
                                    {
                                        header: 'Status',
                                        dataIndex: 'STVAL',
                                        width: 100,
                                        readOnly: true,
                                        editor: // <editor-fold defaultstate="collapsed" desc="combo">
                                        {
                                            xtype: 'combo',
                                            store: comboStore,
                                            queryMode: 'local',
                                            editable: false,
                                            fieldStyle:'text-align:center',
                                            listConfig: { style: 'text-align:center' },
                                            valueField: 'id', displayField: 'label',
                                            enableKeyEvents: true,
                                            listeners:{
                                                keyup: function (combo, e) {
                                                    var key = String.fromCharCode(e.getKey());
                                                    var filter = /^[a-zA-Z]+$/;
                                                    var test_bool = filter.test(key);
                                                    if (test_bool) {
                                                        combo.doQuery(key);
                                                    }
                                                }
                                            }
                                        },
                                        // </editor-fold>
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = comboStore.getById(value);
                                            if (rec) return rec.get('label');
                                            return '&mdash;';
                                        }
                                    },
                                    {
                                        text: 'Comment 1', dataIndex: 'strDescripcion', width: 160,
                                        editor: { xtype: 'textfield', fieldStyle:'text-align:center' }
                                    },
                                    {
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 45,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Save',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 55,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/img/botones/16x16/Save.png',
                                                tooltip: 'Save',
                                                handler: 'onSaveClick'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
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
});