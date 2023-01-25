/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.eecta.EmisionEdoCtaForm.ConsultaSaldosDetForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-ConsultaSaldosDetForm',
    controller: prototype.id02 + '-consultaSaldosDetController',
    requires: [
        'Ext.Praxis.controller.eecta.EmisionEdoCta.ConsultaSaldosDetController',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridSaldosAntDet',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridSaldosDet'
    ],
    title: 'Detalle de Saldos',
    header: true,
    width: 800,
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
            id: prototype.id02 + '-DataEntry-center',
            border: false,            
            margin: '2 0 2 0 ',
            defaults: {
                border: false,
                autoScroll: false
            },
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 790,
                    border: true,
                    margin: '2 1 2 1',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            width: 570,
                            //height: 75,
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
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3953CDCLI',
                                            fieldLabel: 'Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, fieldStyle: 'font-weight: bold;font-size:12px;text-align:center',                                     
                                            readOnly: true,
                                            width: 160
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3953RSOCI',
                                            labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            padding: '0 0 0 2',fieldStyle: 'font-weight: bold;font-size:12px;text-align:left',
                                            readOnly: true, labelWidth: 10,
                                            width: 350 //, padding: '0 0 0 2'
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
                                            xtype: 'textareafield',  height: 30,                                            
                                            fieldLabel: 'Dirección', labelStyle: 'font-weight: bold;',
                                            border: false, readOnly: true, labelAlign: 'right',
                                            id: prototype.id02 + '-A3953DIRE1',fieldStyle: 'font-weight: bold;font-size:11px;text-align:left',                                            
                                            width: 512, labelWidth: 80, maxRows: 3
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            width: 100,                            
                            margin: '2 2 2 2 ',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FPERI',
                                    fieldLabel: 'Al Periodo', labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 85,
                                    width: 80, padding: '5 5 5 5',fieldStyle: 'font-weight: bold;font-size:12px;text-align:center',
                                    format: 'Ym', value: new Date(),                                    
                                    readOnly: true
                                }
                            ]
                        }                                                                        
                    ]
                },
                {
                    xtype: 'label',
                    text: 'ANTIGUEDAD DE SALDOS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 80,
                    border: false,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-contenedor-grid',
                            align: 'center',
                            border: true,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id02 + '-info-ant'
                                }
                            ]
                        }
                        // </editor-fold>                                                 
                    ]
                },
                {
                    xtype: 'label',
                    text: 'DETALLE DE SALDOS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 280,
                    width: 799,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-contenedor-grid-det',
                            align: 'center',
                            border: false,
                            width: 799,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id02 + '-info-det'
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
                                    id: prototype.id02 + '-A3981TOT',
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
                            id: prototype.id02 + '-A3981TOTLT',
                            style: 'font-weight:bold;color:#112664;font-size:11px',
                            padding: '1 0',margin: '1 1 1 8 '
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
                    id: prototype.id02 + '-btn-excel',
                    iconCls: 'prx-icon-excel',
                    listeners: {
                        click: 'onExcelDonwloadClick02'
                    }
                },
                {
                    text: 'Regresar',
                    id: prototype.id02 + '-btn-cancel',
                    iconCls: 'prx-icon-back',
                    listeners: {
                        click: 'onCancelClick02'
                    }
                }
            ]
        }
    ]
});
