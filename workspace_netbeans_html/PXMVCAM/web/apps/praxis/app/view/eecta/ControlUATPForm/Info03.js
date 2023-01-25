
Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.Info03', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id04 + '-info03',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id04 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id04 + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
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
                            id: prototype.id04 + '-gridData',
                            columnLines: true,
                            width: 780,
                            height: 310,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [                                    
                                    {
                                        text: 'Ticket', dataIndex: 'A4054SERIE', width: 110, align: 'center', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A4058CIA') + record.get('A4058FORMA') + record.get('A4058SERIE');
                                        }
                                    },
                                    {
                                        text: 'Seq', dataIndex: 'A4058SEQ', width: 40, align: 'center', locked: true
                                    },
//                                    {
//                                        text: 'Estado', dataIndex: 'A4054STAT', align: 'center', width: 60, locked: true,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            var VL_DES = 'Pendiente';
//                                            if (record.get('A4054STAT')==='2') VL_DES = 'Error al obtener UUID';
//                                            if (record.get('A4054STAT')==='1') VL_DES = 'OK';                                            
//                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="' + VL_DES + '">';
//                                            if (value === '1')
//                                                html = '<img src="resources/img/semaforo/Circle_Green.png" title="' + VL_DES + '" >';
//                                            if (value === '2')
//                                                html = '<img src="resources/img/semaforo/Circle_Red.png" title="' + VL_DES + '" >';
//                                            return html;
//                                        }
//                                    },                                    
                                    {text: 'Trx.', dataIndex: 'A4058TRNCU', align: 'center', width: 60, locked: true},
                                    {text: 'Fecha<br>Contable', dataIndex: 'A4058FCONT', align: 'center', width: 70, locked: true},
                                    {
                                        text: 'Error/Status',
                                        columns: [
                                            {text: 'Código', dataIndex: 'A4058CODER', width: 60, align: 'left'},
                                            {text: 'Descrip.', dataIndex: 'A4058DATA', width: 200, align: 'left'},
                                            {text: 'Est.', dataIndex: 'A4058STSER', width: 50, align: 'center'},
                                            {text: 'Tipo<br>Correc.', dataIndex: 'A4058TIPCO', width: 60, align: 'center'},
                                            {text: 'Usuario', dataIndex: 'A4058USRFZ', width: 60, align: 'center'},                                            
                                            {text: 'Fecha', dataIndex: 'A4058FECFZ', width: 70, align: 'center'},
                                            {text: 'Hora', dataIndex: 'A4058HORFZ', width: 60, align: 'left'}
                                        ]
                                    }                                   
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
                            id: prototype.id04 + '-pie',
                            width: 780,
                            height: 35,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id04 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id04 + '-paggin',
                                                    pageSize: 20,
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
