/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ViewTicketAccountingForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1800,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: #E3EAEF;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: #E3EAEF',
                    border: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel',
                            id:prototype.id+'-panelLista',
                            bodyStyle: 'background: #E3EAEF',
                            border: false,
                            layout: 'vbox',
                            items: [
                                // --------------------------   GRID MAIN DATA---------------------
                                //-----------------------------------------------------------------
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background: #E3EAEF',
                                    height: 500,
                                    width: 472,
                                    columnLines: true,
                                    resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                text: '',
                                                width: 30,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            },
                                            {text: 'Ticket', width: 120, dataIndex: 'TICKET'},
                                            {text: 'Cupones', width: 0, dataIndex: 'CUPONES'},
                                            {text: 'TRNCU', width: 60, dataIndex: 'TRNCU'},
                                            {text: 'Status', width: 60, dataIndex: 'ESTADO'},
                                            {text: 'Message', width: 200, dataIndex: 'MENSAJETKT'}
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
                                            width: 470,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '3px 0px 0px 5px'
                                            },
                                            items: [
                                                {
                                                    text: 'Total Tickets :',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 100
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // --------------------------   GRID MAIN DATA DETAIL---------------------
                        //------------------------------------------------------------------------
                        {
                            xtype: 'grid',
                            padding: '20 0 0 0',
                            id: prototype.id + '-gridData2',
                            bodyStyle: 'background: #E3EAEF',
                            height: 520,
                            width: 1350,
                            columnLines: true,
                            resizable: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'TDOC', width: 50, dataIndex: 'TDOC'},
                                    {text: 'TFOR', width: 50, dataIndex: 'TFOR'},
                                    {text: 'C1', width: 40, dataIndex: 'CONCEPT1'},
                                    {text: 'C2', width: 40, dataIndex: 'CONCEPT2'},
                                    {text: 'C3', width: 40, dataIndex: 'CONCEPT3'},
                                    {text: 'Card', width: 50, dataIndex: 'TTARJ'},
                                    {text: 'Nbr Card', width: 140, dataIndex: 'NTARJ',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.NTARJ === 'TOTAL' ? 'bold' : 'normal';
                                            metaData.style = "font-weight:" + (font) + ";";
                                            return value;
                                        }
                                    },
                                    {text: 'RFIC', width: 50, dataIndex: 'RFIC'},
                                    {text: 'RFIS', width: 50, dataIndex: 'RFIS'},
                                    {text: 'Debit Loc', width: 100, dataIndex: 'DEBITO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.NTARJ === 'TOTAL' ? 'bold' : 'normal';
                                            var background = record.data.NTARJ === 'TOTAL' ? '#FBD705' : '#99FFCC';
                                            metaData.style = "font-weight:" + (font) + ";background:" + background + ';';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Debit Loc', width: 100, dataIndex: 'CREDITO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.NTARJ === 'TOTAL' ? 'bold' : 'normal';
                                            var background = record.data.NTARJ === 'TOTAL' ? '#FBD705' : '#99FFCC';
                                            metaData.style = "font-weight:" + (font) + ";background:" + background + ';';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Debit Rev', width: 100, dataIndex: 'DEBITORV',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.NTARJ === 'TOTAL' ? 'bold' : 'normal';
                                            var background = record.data.NTARJ === 'TOTAL' ? '#FBD705' : '#CCCCCC';
                                            metaData.style = "font-weight:" + (font) + ";background:" + background + ';text-align:right';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Credit Rev', width: 100, dataIndex: 'CREDITORV',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.NTARJ === 'TOTAL' ? 'bold' : 'normal';
                                            var background = record.data.NTARJ === 'TOTAL' ? '#FBD705' : '#CCCCCC';
                                            metaData.style = "font-weight:" + (font) + ";background:" + background + ';text-align:right';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'IVA', width: 50, dataIndex: 'TASA'},
                                    {text: 'FOP IVA', width: 80, dataIndex: 'FOP_IVA'},
                                    {text: 'F.OPEN', width: 80, dataIndex: 'FOPEN'},
                                    {text: 'VRIC', width: 80, dataIndex: 'VRIC'},
                                    {text: 'PFC', width: 80, dataIndex: 'PFC'},
                                    {text: 'IATAVTA', width: 80, dataIndex: 'IATAVTA'},
                                    {text: 'FECUSO', width: 80, dataIndex: 'FECUSO'},
                                    {text: 'CTA', width: 250, dataIndex: 'CTA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                            var background = record.data.NTARJ === 'TOTAL' ? '#FBD705' : '#CCCCCC';
                                            if (record.data.NTARJ === 'TOTAL') {
                                                background = '#ffffff';
                                            } else {
                                                if (record.data.CTA === '00000000000000000000000000000') {
                                                    background = '#ff0000';
                                                } else {
                                                    background = '#ffffff';
                                                }
                                            }
                                            metaData.style = "background:" + background + ';';
                                            return value;
                                        }
                                    },
                                    {text: 'LIB1', width: 50, dataIndex: 'LIB1'},
                                    {text: 'CIA1', width: 50, dataIndex: 'CIA1'},
                                    {text: 'CLIENTE', width: 100, dataIndex: 'CLIENTE'},
                                    {text: 'DIRECCION', width: 100, dataIndex: 'DIRECCION'},
                                    {text: 'PROVEEDOR', width: 100, dataIndex: 'PROVEEDOR'},
                                    {text: 'TD_ORACLE', width: 120, dataIndex: 'TD_ORACLE'},
                                    {text: 'COMB', width: 70, dataIndex: 'COMB'},
                                    {text: 'TITULO', width: 200, dataIndex: 'TITULO'},
                                    {text: 'SUCURSAL', width: 200, dataIndex: 'SUCURSAL'},
                                    {text: 'CTACTRL', width: 250, dataIndex: 'CTACTRL'},
                                    {text: 'TITULOCTRL', width: 100, dataIndex: 'TITULOCTRL'},
                                    {text: 'LIBCTRL', width: 80, dataIndex: 'LIBCTRL'},
                                    {text: 'CTAPROVEE', width: 200, dataIndex: 'CTAPROVEE'},
                                    {text: 'TITULOPROVEE', width: 200, dataIndex: 'TITULOPROVEE'},
                                    {text: 'L.PRO', width: 45, dataIndex: 'LIBPROVEE'},
                                    {text: 'LCTACTRLPROVEEPRO', width: 250, dataIndex: 'CTACTRLPROVEE'},
                                    {text: 'TITULOCTRLPROVEE', width: 200, dataIndex: 'TITULOCTRLPROVEE'},
                                    {text: 'L.P.CTRL', width: 60, dataIndex: 'LIBCTRLPROVEE'},
                                    {text: 'CTAARPROVEE', width: 250, dataIndex: 'CTAARPROVEE'},
                                    {text: 'TITULOARPROVEE', width: 200, dataIndex: 'TITULOARPROVEE'},
                                    {text: 'L.AR', width: 40, dataIndex: 'LIBARPROVEE'},
                                    {text: 'CLI. AR06', width: 100, dataIndex: 'CLIENTEAR06'},
                                    {text: 'DIR. AR06', width: 100, dataIndex: 'DIRECCIONAR06'},
                                    {text: 'TD. AR06', width: 100, dataIndex: 'TD_ORACLEAR06'}
                                ]
                            }
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

