/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FOBForm.SendMailDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-sendMailDataEntry',
    controller: prototype.id + '-sendMailDataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.FOB.SendMailDataEntryFOBController'
    ],
    title: 'Send Mail',
    header: true,
    width: 700,
    height: 550,
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
            id: prototype.id + '-sm' + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 700,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">IATA Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA1728IATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 90,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 8,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA003KEY3',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 450,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Lote</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA1728LOTE',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 150,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 20
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 50,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;float:right;  ">Source</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA1728FUENT',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    //maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 50,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;float:right;  ">Period</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA1728FINI',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 70,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    // maxLength: 3
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 40,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;float:right;  ">To</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA1728FFIN',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 70,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px'
                                                    // maxLength: 3
                                        }


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">To</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtA003MAIL',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 550,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 140
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Cc</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtEmailCcp',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 550,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 140
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Subject</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-sm' + '-txtAsunto',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 550,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 140
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            height: 300,
                                            id: prototype.id + '-sm' + '-txtMensaje',
                                            padding: '2px 5px 2px 3px',
                                            width: 670,
                                            fieldLabel: '',
                                            value: '\nEstimado Franquiciatario: \
                                                    \nPor este medio se envían archivos en formato PDF y TXT con el detalle de las comisiones autorizadas\
                                                    \npor el periodo de referencia.\
                                                    \n\
                                                    \nSe le solicita enviar a la brevedad:\
                                                    \n1.	La(s) factura(s) correspondiente(s) de acuerdo al procedimiento vigente\
                                                    \n2.	La pantalla(s) de alta en el portal Interfactura\
                                                    \n3.	Imagen PDF de la ficha de depósito o transferencia electrónica.\
                                                    \n\
                                                    \nEstos documentos se deberán remitir bajo la responsabilidad del franquiciatario dentro de las siguientes 24 \
                                                    \nhoras a partir de la recepción de este aviso al siguiente correo electrónico: \
                                                    \namcontrolventasfranquicias@aeromexico.com\
                                                    \n\
                                                    \nAgradecemos de antemano su atención.\
                                                    \n\
                                                    \nGerencia de Control de Ingresos - Grupo Aeromexico\
                                                    ',
                                            readOnly: true,
                                            labelPad: 0,
                                            labelSeparator: ' ',
                                            labelStyle: 'color: #0B333C; font-size: 12px; text-align:left;font-weight:bold;',
                                            fieldStyle: 'color: #0B333C; font-size: 12px;',
                                            labelWidth: 0
                                        }


                                    ]
                                }
                            ]
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
            ui: 'footer',
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Send',
                    id: prototype.id + '-sm' + '-btn-send',
//                    iconCls: 'prx-icon-save',
                    icon: 'resources/img/botones/24x24/Forward.png',
                    //hidden: true,
                    listeners: {
                        click: 'onSendClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-sm' + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }


            ]
        }
    ]
});