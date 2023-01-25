
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGridDet', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id01 + '-infoGridDet',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id01 + '-boxPrincipal',
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
                {
                    region: 'center',
                    id: prototype.id01 + '-boxMainData',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridData',
                            columnLines: true,
                            width: '100%',
                            height: 480,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {text: 'Ticket', dataIndex: 'VP_TICKET', align: 'left', width: 105, locked: true},
                                    {text: 'Sec.', dataIndex: 'A3932SEQ', align: 'center', width: 40, locked: true},
                                    {text: 'Cpn', dataIndex: 'A3932CUPON', align: 'center', width: 40, locked: true},
                                    {text: 'PNR', dataIndex: 'A3932PNR', align: 'center', width: 60, locked: true},
                                    {text: 'Fecha<br>Emision', dataIndex: 'A3932SALED', align: 'center', width: 70, locked: true},
                                    {text: 'Tipo<br>Doc.', dataIndex: 'A3932TDOC', align: 'center', width: 60, locked: true},
                                    {text: 'Pax', dataIndex: 'A3932PAX', align: 'left', widht: 180, locked: true},
                                    {text: 'Estado', dataIndex: 'A3932ESTAD', width: 100, align: 'left'},
                                    {
                                        text: 'Apl.<br>Caduco', dataIndex: 'A3932STCAD', width: 58, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            //metaData.style = 'font-weight:bold;color:green;';     
                                            if (record.get('A3932STCAD') === 'Y')
                                                return '<img title="Aplica Caduco" src="resources/img/botones/checkbox_yes_16.png" ></img>';
                                            if (record.get('A3932STCAD') === 'N')
                                                return '<img title="No Aplica" src="resources/img/botones/restricted_folder_symbol_stop-16.png" ></img>';
                                            else
                                                return '<img title="Pendiente procesar" src="resources/img/botones/ui-check-box-uncheck.png"></img>';
                                        }
                                    },
                                    {text: 'F. Vuelo', dataIndex: 'A3932FVLO', align: 'left', width: 70},
                                    {text: 'N. Vuelo', dataIndex: 'A3932NVLO', align: 'center', width: 60},
                                    {text: 'Carr.', dataIndex: 'A3932CARRA', align: 'center', width: 40},
                                    {text: 'Dep.', dataIndex: 'A3932DEPAR', align: 'center', width: 45},
                                    {text: 'Arriv.', dataIndex: 'A3932ARRIV', align: 'center', width: 45},
                                    {text: 'Clase', dataIndex: 'A3932BCLAS', align: 'center', width: 45},
                                    {text: 'Status<br>Reserv.', dataIndex: 'A3932CSTAT', align: 'left', width: 50},
                                    {text: 'Agent', dataIndex: 'A3932STNBR', align: 'center', width: 70},
                                    {text: 'Nº Intentos<br> de Reg.', dataIndex: 'A3932NINTR', align: 'center', width: 70}                                    
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-pie',
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 35,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id01 + '-boxPaginacion',
                                    //width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id01 + '-paggin',
                                                    pageSize: 18,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
