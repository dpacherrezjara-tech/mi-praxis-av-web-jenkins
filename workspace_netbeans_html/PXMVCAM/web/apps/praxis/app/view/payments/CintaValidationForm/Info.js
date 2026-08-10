/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.define('Ext.Praxis.view.payments.CintaValidationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;border: none;',

    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
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
                width: 1400,
                height: 700,
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
                            height: 655,
                            width: 1400,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [

                                // =======================
                                // PANEL DE LA GRILLA MAIN
                                // =======================
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridSearch',
                                    
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    items: [

                                        {
                                            xtype: 'label',
                                            text: 'CINTA VALIDATION',
                                            margin: '0 0 15 0',
                                            style: 'font-size:22px;font-weight:bold;color:#2F5597;text-align:center;'
                                        },

                                        {xtype: 'tbspacer', height: 15},

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSearch',
                                            //gridEmailControl
                                            width: 1370,
                                            height: 500,
                                            hidden: false,
                                            columnLines: true,
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [

                                                    {
                                                        text: 'DIA DE PROCESO',
                                                        dataIndex: 'fechaProceso',
                                                        width: 120,
                                                        align: 'center',
                                                        sortable: false,
                                                        menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetail'
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                            return '<a href="javascript:void(0)" style="color:#057ECB;text-decoration:underline;"><b>' + value + '</b></a>';
                                                        }

                                                    },

                                                    {text: ' TKTS', dataIndex: 'totalCinta', width: 60},

                                                    {text: 'VENTAS <br> ESPERADAS', dataIndex: 'ventasEsperadas', width: 120},

                                                    {text: 'VENTAS <br> CARGADAS', dataIndex: 'ventasCargadas', width: 120},

                                                    {text: 'ESTADO', dataIndex: 'estadoVentas', width: 100},

                                                    {text: 'REEMBOLSOS <br> ESPERADOS', dataIndex: 'reembolsosEsperados', width: 100},

                                                    {text: 'REEMBOLSOS <br>CARGADOS', dataIndex: 'reembolsosCargados', width: 100},

                                                    {text: 'ESTADO', dataIndex: 'estadoReembolsos', width: 100},

                                                    {text: 'ADM/ACM <br> ESPERADOS', dataIndex: 'admAcmEsperados', width: 110},

                                                    {text: 'ADM/ACM <br> CARGADOS', dataIndex: 'admAcmCargados', width: 110},

                                                    {text: 'ESTADO', dataIndex: 'estadoAdmAcm', width: 100},

                                                    {text: 'BALANCE DE PROCESO', dataIndex: 'balanceProceso', width: 228},
                                                ]
                                            }
                                        }
                                    ]
                                },

                                // ===========================
                                // PANEL GRILLA DETAIL
                                // ===========================

                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridDetail',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    hidden: true,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    items: [

                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblProcess',
                                            hidden: true,
                                            margin: '0 0 15 0',
                                            style: 'font-size:16px;font-weight:bold;color:#2F5597;',
                                            text: ''
                                        },

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSearchDetail',
                                            width: 600,
                                            height: 500,
                                            columnLines: true,
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [

                                                    {text: 'FECHA <br> PROCESO', dataIndex: 'fechaProceso', width: 100},
                                                    {text: 'TICKET', dataIndex: 'ticket', width: 130},
                                                    {text: 'TIPO <br> DOCUMENTO', dataIndex: 'tipoDoc', width: 100, align: 'center'},
                                                    {text: 'TABLA <br> ORIGEN', dataIndex: 'tablaOrigen', width: 267},
                                                    
                                               
                                                ]
                                            }
                                        }
                                    ]
                                },

                                {xtype: 'tbspacer', height: 20},

                                // =======================
                                // PANEL DEL PIE
                                // =======================
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    width: 800,
                                    height: 25,
                                    bodyStyle: 'background-color: #E1E6EC; border-radius: 5px;',

                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 650,
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


Ext.util.CSS.createStyleSheet(`

.badge{
    padding:2px 10px;
    border-radius:10px;
    color:white;
    font-weight:bold;
    font-size:11px;
    display:inline-block;
    min-width:70px;
    text-align:center;
}

.badge-active{
    background:#28a745;
}

.badge-inactive{
    background:#6c757d;
}

`, 'status-badge');