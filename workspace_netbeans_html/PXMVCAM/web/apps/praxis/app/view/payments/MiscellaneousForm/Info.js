Ext.define('Ext.Praxis.view.payments.MiscellaneousForm.Info', {
extend: 'Ext.form.Panel',
        alias: 'widget.' + prototype.id + '-info',
        layout: 'border',
        bodyStyle: 'background-color: #E3EAEF;border: none;',
        defaults: {
        bodyStyle: 'background: transparent;',
                border: false,
        },
        items: [
        {
        region: 'center',
                margin: '20px 0 0 0',
                layout: {
                type: 'vbox',
                        align: 'center'
                },
                defaults: {
                bodyStyle: 'background: transparent;',
                        border: false,
                        width: 1500,
                        height: 'auto',
                        align: 'center'
                },
                items: [
                {
                xtype: 'panel',
                        id: prototype.id + '-panelMain',
                        bodyStyle: 'background-color: #E3EAEF;',
                        border: false,
                        layout: {
                        type: 'vbox',
                                align: 'center'
                        },
                        items: [
                                // --------------------------   GRID MAIN DATA---------------------
                                        //-----------------------------------------------------------------
                                        {
                                        xtype: 'panel',
                                                border: false,
                                                id: prototype.id + '-panelGridData',
                                                bodyStyle: 'background-color: #E3EAEF;',
                                                padding: '1',
                                                border: false,
                                                height: 860,
                                                width: 1000,
                                                layout: {
                                                type: 'vbox',
                                                        align: 'center'
                                                },
                                                items: [
                                                {
                                                xtype: 'grid',
                                                        id: prototype.id + '-gridDataAirport',
                                                        width: 970,
                                                        hidden: false,
                                                        columnLines: true,
                                                        height: 520,
                                                        columns: {
                                                        defaults: {
                                                        menuDisabled: true,
                                                                sortable: true,
                                                                align: 'center'
                                                        },
                                                                items: [
                                                                {text: 'Table', dataIndex: 'TTABLA', width: 55, hidden: false},
                                                                {text: 'Code', dataIndex: 'CODETB', width: 55},
                                                                {text: 'Status', dataIndex: 'STVAL', width: 80, hidden: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align:center;';
                                                                                if (value === 'V') {
                                                                        value = 'Vigente';
                                                                        } else if (value === 'A') {
                                                                        value = 'Anulado';
                                                                        }
                                                                        return  value;
                                                                        }
                                                                },
                                                                {text: 'Description 1', dataIndex: 'DESCRE1', width: 180,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align:left;';
                                                                                return  value;
                                                                        }
                                                                },
                                                                {text: 'Description 2', dataIndex: 'DESCRE2', width: 180,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align:left;';
                                                                                return  value;
                                                                        }
                                                                },
                                                                {
                                                                text: 'Description 3',
                                                                        dataIndex: 'DESCRE3',
                                                                        width: 180,
                                                                        renderer: function (value, metaData) {
                                                                        metaData.style = 'text-align:left;';
                                                                                if (value === "0" || value === 0) {
                                                                        return "Habilitado";
                                                                        } else if (value === "1" || value === 1) {
                                                                        return "Deshabilitado";
                                                                        } else {
                                                                        return value; 
                                                                        }
                                                                        }
                                                                },
                                                                {text: 'Document', dataIndex: 'TDOC', width: 120,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align:left;';
                                                                                return  value;
                                                                        }
                                                                },
                                                                {text: 'Cantidad 1', dataIndex: 'CANT1', width: 70, hidden: true},
                                                                {text: 'Cantidad 2', dataIndex: 'CANT2', width: 70, hidden: true},
                                                                {
                                                                text: 'Date',
                                                                        defaults: {
                                                                        menuDisabled: true,
                                                                                sortable: false,
                                                                                align: 'center'
                                                                        },
                                                                        columns: [
                                                                        {text: 'From', dataIndex: 'DATINI', width: 70, hidden: false, style:'padding:5px'},
                                                                        {text: 'To', dataIndex: 'DATFIN', width: 70, hidden: false},
                                                                        ]
                                                                },
                                                                {
                                                                sortable: false,
                                                                        xtype: 'actioncolumn',
                                                                        width: 42,
                                                                        text: 'Edit',
                                                                        align: 'center',
                                                                        items: [
                                                                        {
                                                                        iconCls: 'prx-icon-edit',
                                                                                tooltip: 'Edit',
                                                                                handler: 'onEditClick'
                                                                        }
                                                                        ]
                                                                }
                                                                ]
                                                        }
                                                },
                                                {
                                                xtype: 'panel',
                                                        id: prototype.id + '-pie',
                                                        layout: {
                                                        type: 'hbox',
                                                                pack: 'center'
                                                        },
                                                        border: false,
                                                        width: 700,
                                                        height: 25,
                                                        bodyStyle: 'background-color: #E1E6EC; border-radius: 5px;',
                                                        margin: '15px 0 0px 0px',
                                                        items: [
                                                        {
                                                        xtype: 'panel',
                                                                width: 450,
                                                                height: 25,
                                                                bodyStyle: 'background-color: #6A8BAA; border: 1px solid #81BEF7; border-radius: 5px',
                                                                layout: {
                                                                type: 'hbox',
                                                                        pack: 'center'
                                                                },
                                                                defaults: {
                                                                xtype: 'label'
                                                                },
                                                                items: [
                                                                {
                                                                text: 'Page',
                                                                        width: 50,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
                                                                },
                                                                {
                                                                id: prototype.id + '-lbl-currentPage',
                                                                        text: '1',
                                                                        width: 50,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
                                                                },
                                                                {
                                                                text: 'OF',
                                                                        width: 50,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
                                                                },
                                                                {
                                                                id: prototype.id + '-lbl-pageCount',
                                                                        text: '0',
                                                                        width: 50,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
                                                                },
                                                                {xtype: 'tbspacer', width: 50},
                                                                {
                                                                text: 'Total Found',
                                                                        width: 80,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
                                                                },
                                                                {
                                                                id: prototype.id + '-lbl-total',
                                                                        text: '0',
                                                                        width: 40,
                                                                        style: 'margin-top: 3px;color:white;font-weight:bold'
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
                }
        );


