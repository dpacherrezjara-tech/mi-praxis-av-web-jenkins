/**
 * @author: remicioluis
 */

Ext.define('Ext.global.BrowserTicket', {
    extend: 'Ext.window.Window',
    height: 600,
    width: 1000,
    closable: true,
    minimizable: false,
    resizable: false,
    modal: true,
    bodyPadding: 3,
    bodyStyle: 'background-color: white;',
    defaults: {
        border: false
    },
    initComponent: function () {
        var me = this;

        // me.id = `BrowserTicket-Container-${me.id}-${Ext.id()}`;
        me.id = 'BrowserTicket-Container-' + String(me.id) + '-' + String(Ext.id());

        me.items = [
            {
                xtype: 'panel',
                defaults: {
                    style: 'margin: 1px;'
                },
                items: [
                    {
                        xtype: 'panel',
                        bodyStyle: 'background-color: #E3EAF9;',
                        defaults: {
                            bodyStyle: 'background: transparent',
                            border: false,
                            padding: '5px'
                        },
                        items: [
                            {
                                xtype: 'form',
                                id: me.id + '-form-Ticket',
                                defaults: {
                                    padding: '1px',
                                    bodyStyle: 'background: transparent'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        border: false,
                                        defaults: {
                                            bodyStyle: 'background: transparent'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                border: false,
                                                style: 'margin-top: 2px',
                                                defaults: {
                                                    style: 'margin: 1px'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combo',
                                                        id: me.id + '-cmb-search',
                                                        fieldLabel: '<b>Search by</b>',
                                                        queryMode: 'local',
                                                        valueField: 'code',
                                                        displayField: 'name',
                                                        emptyText: '[SELECTED]',
                                                        labelWidth: 70,
                                                        width: 200,
                                                        editable: false
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: me.id + '-txtCust',
                                                        fieldLabel: 'Ticket Number',
                                                        width: 140,
                                                        value: '139',
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        enforceMaxLength: 3,
                                                        labelAlign: 'right'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: me.id + '-txtTickt',
                                                        hideLabel: true,
                                                        width: 100,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 10,
                                                        enforceMaxLength: 10
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                border: false,
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                },
                                                bodyStyle: 'background: transparent',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'toolbar',
                                                        items: [
                                                            {
                                                                xtype: 'button',
                                                                id: me.id + '-btn-search',
                                                                iconCls: 'prx-icon-search',
                                                                tooltip: 'Search',
                                                                listeners: {
                                                                    click: function (obj) {
                                                                        me.getbuscar();
                                                                    }
                                                                }
                                                            }/*,
                                                             {
                                                             xtype: 'button',
                                                             id: me.id + '-btn-excel',
                                                             iconCls: 'prx-icon-excel',
                                                             tooltip: 'Export to Excel'
                                                             },
                                                             {
                                                             xtype: 'button',
                                                             id: me.id + '-btn-clear',
                                                             iconCls: 'prx-icon-clear',
                                                             tooltip: 'Clear Options'
                                                             },
                                                             {
                                                             xtype: 'button',
                                                             id: me.id + '-btn-back',
                                                             iconCls: 'prx-icon-back',
                                                             tooltip: 'Back'
                                                             }*/
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
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #E3EAF9;',
                        items: [
                            {
                                xtype: 'grid',
                                id: me.id + '-gridData',
                                columnLines: true,
                                autoScroll: true,
                                height: 500,
                                columns: {
                                    items: [
                                        {text: 'Passenger', dataIndex: 'A2024PAX', flex: 1},
                                        {text: 'Ticket Number', dataIndex: 'A2024TICKET', width: 100},
                                        {text: 'SEQ', width: 38, dataIndex: 'A2024SEQ'},
                                        {text: 'CC Number', dataIndex: 'A2024NREF', width: 100},
                                        {text: 'Issue <br/>Orig.', dataIndex: 'A2024CIUVTA', width: 60},
                                        {text: 'Issue Date', dataIndex: 'A2024FECVTA', width: 80},
                                        {text: 'IATA', dataIndex: 'A720AGENTE', width: 90},
                                        {text: 'Fare', dataIndex: 'A2024TARIFA', width: 90},
                                        {text: 'Amount', dataIndex: 'A2024VFOP', width: 90},
                                        {text: 'Cur', dataIndex: 'A2024MONEDA', width: 40},
                                        {text: 'PNR', dataIndex: 'A2024PNR', width: 40},
                                        {
                                            sortable: false,
                                            xtype: 'actioncolumn',
                                            text: '',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    icon: 'resources/img/botones/check.png',
                                                    handler: function (grid, rowIndex, colIndex) {
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        global.Msg({
                                                            msg: 'Are you sure to add the ticket ?',
                                                            icon: 3,
                                                            buttons: 3,
                                                            fn: function (btn) {
                                                                if (btn === 'yes') {
                                                                    Ext.getCmp(prototype.idadjnew + '-txtCia').setValue(rec.data.A2024TICKET.substring(0, 3));
                                                                    Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').setValue(rec.data.A2024TICKET.substring(3, 13));
                                                                    Ext.getCmp(prototype.idadjnew + '-txtSeq').setValue(rec.data.A2024SEQ);
                                                                    if (Ext.String.trim(rec.data.A2024FECVTA) !== '') {
                                                                        var date = Ext.String.trim(rec.data.A2024FECVTA).substr(0, 4) + '/' + Ext.String.trim(rec.data.A2024FECVTA).substr(4, 2) + '/' + Ext.String.trim(rec.data.A2024FECVTA).substr(6, 2);
                                                                        Ext.getCmp(prototype.idadjnew + '-de-lblDate').setValue(date);
                                                                    }
                                                                    Ext.getCmp(me.id).close();

                                                                }
                                                            }
                                                        });


                                                    }

                                                }
                                            ]
                                        }
                                    ],
                                    defaults: {
                                        sortable: true,
                                        menuDisabled: true,
                                        align: 'center'
                                    }
                                },
                                viewConfig: {
                                    stripeRows: true,
                                    enableTextSelection: true
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        me.listeners = {
            scope: this,
            afterrender: function (obj, e) {
                var me = this;
                me.loadStoreData();
                var grid01 = Ext.getCmp(me.id + '-gridData');
                var store01 = Ext.create('Ext.data.Store', {
                    storeId: me.id + '-store-grid-tiket'
                });
                grid01.setStore(store01);
            }
        },
                this.callParent();
    },
    loadStoreData: function () {
        var me = this;

        var cmbSearch = Ext.getCmp(me.id + '-cmb-search');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "SALE"},
                {"code": "2", "name": "EXCH"},
                {"code": "3", "name": "RFND"},
                {"code": "4", "name": "FLOWN"},
                {"code": "5", "name": "IXP"},
                {"code": "6", "name": "DISC"},
                {"code": "7", "name": "IXC OAL"},
                {"code": "8", "name": "EMD-FLOWN"},
                {"code": "9", "name": "EXCP"},
                {"code": "10", "name": "RFCP"}
            ]
        }));
    },
    getUniqueId: function () {
        return this.id;
    },
    getbuscar: function () {
        var me = this;
        var Combosearch = Ext.getCmp(me.id + '-cmb-search').getValue();
        var txtCust = Ext.getCmp(me.id + '-txtCust').getValue();
        var txtTickt = Ext.getCmp(me.id + '-txtTickt').getValue();
        if (Combosearch === '') {
            global.Msg({msg: 'Select Of Search By'});
            return;
        }
        if (txtCust === '') {
            global.Msg({msg: 'Enter Cust'});
            return;
        }
        if (txtTickt === '') {
            global.Msg({msg: 'Enter Tickt'});
            return;
        }
        Ext.getCmp(me.id + '-form-Ticket').mask('Please Wait....');
        Ext.Ajax.request({
            url: CONTEXTPATH + '/ADJAccounting' + '/loadDatosTicktes',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_TypeUse: Combosearch,
                VP_CIA: txtCust,
                VP_BOLETO: txtTickt
            },
            success: function (response, options) {
                Ext.getCmp(me.id + '-form-Ticket').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(me.id + '-gridData').getStore().removeAll();
                Ext.getCmp(me.id + '-gridData').getStore().loadData(res.data);
                if (res.data.length > 0) {


                } else {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }



            }
        });
    }
});