/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.eecta.EmisionEdoCtaForm.ConsultaEdoCtaForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id01 + '-ConsultaEdoCtaForm',
    controller: prototype.id01 + '-consultaEdoCtaController',
    requires: [
        'Ext.Praxis.controller.eecta.EmisionEdoCta.ConsultaEdoCtaController',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridVentas',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridPagos'
    ],
    title: 'Consultar Estado de Cuenta',
    header: true,
    width: 750,
    height: 610,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id01 + '-DataEntry-center',
            border: false,
            margin: '2 0 2 0 ',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    height: 70,
                    margin: '2 0 2 0 ',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-CDCLI',
                            fieldLabel: 'Código Cliente', labelAlign: 'top', labelStyle: 'font-weight: bold;',
                            labelWidth: 100, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            padding: '2 2', value: '000001411',
                            readOnly: false,
                            width: 100, height: 27,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 9,
                            listeners: {
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id01 + '-FPERI',
                            fieldLabel: 'Al Periodo', labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 85,
                            width: 80, padding: '2 2 0 5', fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            format: 'Ym',
                            value: '202101',
                            //value: new Date(),
                            //minValue: new Date(1990, 00, 01),
                            //maxValue: new Date()-1,
                            maskRe: /[0-9/]/,
                            editable: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '10 20 0 10',
                            layout: {
                                pack: 'center'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id01 + '-btn-consulta-eecc',
                                    text: 'Consultar',
                                    icon: 'resources/img/botones/search.png',
                                    listeners: {
                                        click: 'onbtn_consultaEECCClick01'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            width: 415,
                            height: 64,
                            margin: '2 2 2 2 ',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    width: '100%',
                                    margin: '1 1 1 1 ',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id01 + '-A3953RSOCI',
                                            //text: 'PETROLEOS MEXICANOS',
                                            style: 'font-weight:bold;color:#112664;',
                                            margin: '1 1 1 5 '
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    width: '100%',
                                    margin: '1 1 1 1 ',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id01 + '-A3953DIRE1',
                                            //text: 'Av. Marina Nacional Nº. 329 INT C3',
                                            style: 'font-weight:bold;color:#112664;',
                                            margin: '0 0 0 5 '
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id01 + '-A3953COLON',
                                            //text: 'Col. Veronica Anzures, Ciudad de México',
                                            style: 'font-weight:bold;color:#112664;',
                                            margin: '0 0 0 5 '
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id01 + '-A3953DELEG',
                                            //text: 'Delegación Miguel Hidalgo - C.P. 1130',
                                            style: 'font-weight:bold;color:#112664;',
                                            margin: '0 0 0 5 '
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 0 2 0 ',
                    items: [
                        {
                            xtype: 'panel',
                            width: 460,
                            border:false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-SALDO-ANTERIOR',
                            fieldLabel: 'Saldo anterior', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            labelWidth: 100, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            padding: '1 3 3 0', value: '0.00',
                            readOnly: true,
                            width: 230, height: 27
                        }
                    ]
                },
                {
                    xtype: 'label',
                    text: 'VENTAS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 160,
                    border: false,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-contenedor-grid',
                            align: 'center',
                            border: true,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id01 + '-info'
                                }
                            ]
                        }
                        // </editor-fold>                                                 
                    ]
                },
                {
                    xtype: 'label',
                    text: 'PAGOS APLICADOS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 160,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-contenedor-grid-pagos',
                            align: 'center',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id01 + '-info-pagos'
                                }
                            ]
                        }
                        // </editor-fold>                                                 
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: '100%',
                    margin: '1 0 1 0 ',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: '100%',
                            //margin: '1 0 1 0 ',
                            items: [
                               {
                                   xtype: 'panel',
                                   width: 470,
                                   border:false
                               }, 
                               {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A3981TOT',
                                    fieldLabel: 'GRAN TOTAL:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    labelWidth: 110, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    padding: '1 0',
                                    value: '0.00',
                                    readOnly: true,
                                    width: 220, height: 27
                                }
                            ]
                        },                        
                        {
                            xtype: 'label',
                            id: prototype.id01 + '-A3981TOTLT',
                            style: 'font-weight:bold;color:#112664;font-size:11px',
                            padding: '1 0',margin: '1 1 1 5 '
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Export Excel',
                    id: prototype.id01 + '-btn-export',
                    iconCls: 'prx-icon-excel',
                    listeners: {
                        click: 'onExportExcelClick'
                    }
                },
                {
                    text: 'Detalle de Saldos',
                    id: prototype.id01 + '-btn-detSaldos',
                    iconCls: 'prx-icon-image-file',
                    listeners: {
                        click: 'onbtn_detalleEECCClick'
                    }
                },
                {
                    text: 'Cerrar',
                    id: prototype.id01 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick01'
                    }
                }
            ]
        }
    ]
});
