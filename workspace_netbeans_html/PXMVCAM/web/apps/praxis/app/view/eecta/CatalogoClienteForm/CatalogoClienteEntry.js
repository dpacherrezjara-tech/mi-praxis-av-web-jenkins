/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteEntryController',
        'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridUatp',
        'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridIdentif',
        'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridCalendario'        
    ],
    title: 'Mantenimiento Cliente',
    header: true,
    width: 850,
    height: 620,
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
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 500,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: true,
                                            width: 245
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953RSOCI',
                                            fieldLabel: 'Razón Social', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953NCOME').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953NCOME',
                                            fieldLabel: 'Nombre Comercial', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953RFC').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'RFC', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            id: prototype.id + '-A3953RFC',
                                            width: 275,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953TELE1').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953TELE1',
                                            fieldLabel: 'Teléfono', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            width: 170,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            maskRe: /[1234567890\+-]/,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953DIRE1',
                                            fieldLabel: 'Dirección', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 200,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953COLON').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953COLON',
                                            fieldLabel: 'Colonia', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953DELEG').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953DELEG',
                                            fieldLabel: 'Delegación/Mun.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953CIUDA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CIUDA',
                                            fieldLabel: 'Ciudad', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953ESTAD').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953ESTAD',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 265,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953PAIS').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953PAIS',
                                            fieldLabel: 'Pais', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                            width: 110,
                                            enableKeyEvents: true,
                                            padding: '2px 2px 2px 2px',
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[a-z,A-Z]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953CP').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CP',
                                            fieldLabel: 'C.P', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                            width: 100,
                                            enableKeyEvents: true,
                                            padding: '2px 2px 2px 2px',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953TCLIN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '3 3 3 3',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-form01',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'filefield',
                                                    padding: '2 2 2 2',
                                                    id: prototype.id + '-file',
                                                    name: 'logofile',
                                                    emptyText: 'Cargar logo',
                                                    //labelAlign: 'top',
                                                    //fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Cargar logo</strong>',
                                                    allowBlank: true,
                                                    disabled: true,
                                                    accept: '.jpg, .png',
                                                    labelWidth: 80,
                                                    width: 300,
                                                    //buttonText: 'Select logo...',
                                                    regex: /(.)+((\.jpg)|(\.png)(\w)?)$/i,
                                                    regexText: 'Only JPG/PNG formats are accepted',
                                                    buttonConfig: {
                                                        text: 'Seleccionar...',
                                                        width: 100,
                                                        glyph: 'xf3b6@Ionicons'
                                                    },
                                                    listeners: {
                                                        //change: 'onUploadChange'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            ui: 'footer',
                                            margin: '2 0 2 0',
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
                                                    id: prototype.id + '-btn-upload',
                                                    text: 'Upload',
                                                    icon: 'resources/img/botones/update.png',
                                                    disabled: true,
                                                    listeners: {
                                                        click: 'onbtn_uploadClick'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'left',
                                                    width: 250,
                                                    padding: '2px 5px 2px 3px',
                                                    html: '<strong style="color:#AC4546;font-size:10px;">Formato: jpg/png file <br> Dimensión: 245x42 pixels </strong>'

                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Mostrar',
                                                    hidden: true,
                                                    listeners: {
                                                        click: 'onbtn_searchImage'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953LOGO_chk',
                                                    checked: false,
                                                    readOnly: true,
                                                    hidden: true,
                                                    padding: '0px 0px 0px 10px',
                                                    boxLabel: 'Logo Cargado'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pnlImage',
                                    layout: 'vbox',
                                    margin: '1 0 1 0',
                                    height: 68,
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: prototype.id + '-imgImage',
                                            margin: '4 20 4 20', //top/right/left
                                            align: 'center',
                                            src: 'resources/img/not_picture.png',
                                            style: 'background:#FFFFFF;box-shadow: 0px 0px 2px 0px #777;margin: 1px;border-radius:2px',
                                            width: 300,
                                            height: 58
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953LOGO',
                                            hidden: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Archivos envio:',
                                    layout: 'vbox',
                                    margin: '2 2 2 2',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953ARCPD',
                                                    checked: false,
                                                    boxLabel: 'Pago PDF'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953ARCTX',
                                                    checked: false,
                                                    padding: '0px 0px 0px 10px',
                                                    boxLabel: 'Texto'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953ARCEC',
                                                    checked: false,
                                                    boxLabel: 'Edo.Cta'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953ARCFZ',
                                                    checked: false,
                                                    padding: '0px 0px 0px 20px',
                                                    boxLabel: 'Facturas ZIP'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-A3953ARCFX',
                                                    checked: false,
                                                    padding: '0px 0px 0px 10px',
                                                    boxLabel: 'Facturas XML'
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
                    layout: 'hbox',
                    margin: '3 3 3 3',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-A3953TCLIN',
                                            fieldLabel: 'Tipo Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 225,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["C", "CREDITO"],
                                                    ["I", "INTERCAMBIO"],
                                                    ["P", "PRE-COMPRA"]                                                    
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            value: "C",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }// 
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CDMTR',
                                            fieldLabel: 'Master C. Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 225,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'get_ValidaCodeIATA',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953TORGN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-A3953TORGN',
                                            fieldLabel: 'Organismo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 225,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["NAC", "NACIONAL"],
                                                    ["INT", "INTERNACIONAL"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            value: "NAC",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }//   
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CONTR',
                                            fieldLabel: 'Contrato', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            width: 200,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953CTAMA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDet-contrato',
                                            iconCls: 'prx-icon-docum',
                                            tooltip: 'Detalle Contrato',                                              
                                            margin: '0 0 0 2',
                                            listeners: {
                                                click: 'btnDetContrato_click'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CTAMA',
                                            fieldLabel: 'Cuenta Maestra', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            placeholder: 'xx-xx-xxxxxx-xxxx-xxxx-xxxxx-xxxx-xx',
                                            inputMask: '99-99-999999-9999-9999-99999-9999-99',
                                            emptyText: '__-__-______-____-___-_____-____-__', //02-00-000000-0000-1131-11519-0000-00                                            
                                            width: 345,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 40,
                                            listeners: {
                                                //change: 'onUpperValue',                                                
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953CDORA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CDORA',
                                            fieldLabel: 'C. Oracle', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            width: 140,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953BANCO').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953BANCO',
                                            fieldLabel: 'Banco Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 230,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953CTABC').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953CTABC',
                                            fieldLabel: 'Cta. Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            width: 210,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3953INDPL').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'draw',
                                    width: '100%',
                                    height: 7,
                                    border: false,
                                    sprites: [
                                        {
                                            type: 'line',
                                            fromX: 500,
                                            fromY: 5,
                                            toX: 5,
                                            toY: 5,
                                            strokeStyle: '#CCCCFF',
                                            lineWidth: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A3953FALTA',
                                            fieldLabel: 'Fecha Alta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 220,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-A3953FBAJA',
                                            fieldLabel: 'Baja', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 120,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '2 0 0 2 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-A3953STSID',
                                            //checked: false,
                                            //readOnly: true,
                                            //hidden: true,
                                            padding: '0px 0px 0px 10px',
                                            boxLabel: 'Requiere Identificador'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '3 3 3 3',
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Periodicidad envios:',
                                    layout: 'vbox',
                                    margin: '2 2 2 2',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-A3953STSDV',                                            
                                            padding: '0px 0px 0px 10px',
                                            boxLabel: 'Generar Reporte venta por Identificador'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-A3953INDPL',
                                                    fieldLabel: 'Reporte Venta', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 95,
                                                    width: 190,
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["D", "DIARIO"],
                                                            ["S", "SEMANAL"],
                                                            ["Q", "QUINCENAL"],
                                                            ["M", "MENSUAL"],
                                                            ["B", "BIMENSUAL"],
                                                            ["O", "OTRO PERIODO"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    value: "D",
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        //focus: function(combo) {
                                                        //    combo.expand();
                                                        //},
                                                        //keypress: 'onTextKeypress',
                                                        //change: 'cmbfiltro_clickHandler'
                                                    }//                                                    
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    readOnly: true,
                                                    id: prototype.id + '-A3962CONT1',
                                                    fieldLabel: 'Correlat.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                                    width: 130
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-A3953INDPE',
                                                    fieldLabel: 'Edo. Cta.', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 95,
                                                    width: 190,
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["D", "DIARIO"],
                                                            ["S", "SEMANAL"],
                                                            ["Q", "QUINCENAL"],
                                                            ["M", "MENSUAL"],
                                                            ["B", "BIMENSUAL"],
                                                            ["O", "OTRO PERIODO"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    value: "D",
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        //focus: function(combo) {
                                                        //    combo.expand();
                                                        //},
                                                        //keypress: 'onTextKeypress',
                                                        //change: 'cmbfiltro_clickHandler'
                                                    }// 
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    readOnly: true,
                                                    id: prototype.id + '-A3962CONT1_E',
                                                    fieldLabel: 'Correlat.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                                    width: 130
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-A3953INDPP',
                                                    fieldLabel: 'Compl. Pagos', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 95,
                                                    width: 190,
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["D", "DIARIO"],
                                                            ["S", "SEMANAL"],
                                                            ["Q", "QUINCENAL"],
                                                            ["M", "MENSUAL"],
                                                            ["B", "BIMENSUAL"],
                                                            ["O", "OTRO PERIODO"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    value: "D",
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        //focus: function(combo) {
                                                        //    combo.expand();
                                                        //},
                                                        //keypress: 'onTextKeypress',
                                                        //change: 'cmbfiltro_clickHandler'
                                                    }//
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    id: prototype.id + '-A3953DIAPP',
                                                    fieldLabel: ' Dias Adic. ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 75,
                                                    allowDecimals: false,
                                                    width: 130,
                                                    enableKeyEvents: true,
                                                    minValue: 0,
                                                    maxValue: 360,
                                                    listeners: {
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    id: prototype.id + '-A3953PLZCR',
                                                    fieldLabel: 'Plazo Credito', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 95,
                                                    allowDecimals: false,
                                                    width: 150,
                                                    enableKeyEvents: true,
                                                    minValue: 0,
                                                    maxValue: 360,
                                                    listeners: {
                                                        //change: 'onUpperValue',
                                                        //focusleave: 'get_ValidaCodeIATA',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: ' dias',
                                                    labelSeparator: '',
                                                    padding: '0 5 0 5',
                                                    labelWidth: 50
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
                    layout: 'hbox',
                    margin: '1 1 1 1',
                    width: '100%',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.id + '-panel-contenedor-grid-detalles',
                            width: 810,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    title: 'Informacion UATP',
                                    id: prototype.id + '-contenedor-grid-uatp',
                                    items: [
                                        {
                                            xtype: prototype.id + '-info-uatp'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    title: 'Identificador',
                                    id: prototype.id + '-contenedor-grid-Identif',
                                    items: [
                                        {
                                            xtype: prototype.id + '-info-Identif'
                                        }
                                    ]
                                },
                                {
                                    title: 'Contacto Cliente',
                                    xtype: 'checkboxfield'
                                },
                                {
                                    title: 'Contacto Aeromexico',
                                    xtype: 'checkboxfield'
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    title: 'Calendario',
                                    id: prototype.id + '-contenedor-grid-GridCalendario',
                                    items: [
                                        {
                                            xtype: prototype.id + '-info-GridCalendario'
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
            border: true,
            ui: 'footer',
            margin: '5 5 10 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
