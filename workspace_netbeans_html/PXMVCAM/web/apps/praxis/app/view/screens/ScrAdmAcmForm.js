prototype.AdmAcm = {
    id: 'ScrAdmAcmForm'
};
Ext.define('Ext.Praxis.view.screens.ScrAdmAcmForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrAdmAcmForm',
    requires: [
        'Ext.Praxis.controller.screens.ScrAdmAcmController'
    ],
    controller: 'ScrAdmAcmController',
    title: 'Memo Information',    
    header: true,
    width: 950,
    height: 300,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDataTktMemo',
                    hidden: false,
                    layout: 'hbox',
                    defaults: {
                        //anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        //anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 22},
                                        // <editor-fold defaultstate="collapsed" desc="Ticket">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                // anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ticket:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtCia',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtDocument',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'D: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtDCheq',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 20,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Transaction">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Transaction:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTransaction',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 180,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Sale Exch Rate">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Sale Exch Rate:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTCamb',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 180,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="FOB">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'FOB:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFopCode',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFopCur',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 60,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFopAmt',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="NET Remmit">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'NET Remmit:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtNetRemCurr',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtNetRemAmt',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Standard">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Standard:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtComCurr1',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtComAmt1',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Over Comm">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Over Comm:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtComCurr2',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtComAmt2',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%',
                                        //width: 980
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 22},
                                        // <editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                // anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Group:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtGrupoInfo',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 150,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtSource',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtPais',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'File D: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 60
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtIdFile',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Type">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Type:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTDoc',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Issue Date: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtIssueDate',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Local Curr">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Local Curr:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtMdaLoc',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Iata Code: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtIataCode',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Sales City: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtCityVta',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtCtryVta',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Fare">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Fare:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTarifCur',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTarifAmt',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 150,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Tax: ',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTaxCode',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTaxCurr',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTaxAmt',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 110,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Tax On Commission">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Tax On Comm:',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTaxComCurr',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 40,
                                                    fieldStyle: 'color:#0B333C;text-align:left;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTaxComAmt',
                                                    value: '',
                                                    readOnly: true,
                                                    padding: '4 0 5 0',
                                                    width: 150,
                                                    fieldStyle: 'color:#0B333C;text-align:right;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="buttons">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            padding: '4px 4px 4px 4px',
                                            defaults: {
                                                anchor: '100%',
                                                width: 250
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnDeliveryAdm',
                                                    margin: '0 0 0 30',
                                                    text: '<strong style="color:white;">Delivery<strong>',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    width: 80,
                                                    listeners: {
                                                        click: 'btnDeliveryAdm_clickHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnAccountingAdm',
                                                    margin: '0 0 0 30',
                                                    text: '<strong style="color:white;">Accounting<strong>',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    width: 95,
                                                    listeners: {
                                                        click: 'btnAccountingAdm_clickHandler'
                                                    }
                                                },
                                                /*{xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    layout: 'hbox',
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        // <editor-fold defaultstate="collapsed" desc="Related Tickets">
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%',
                                                                width: 185,
                                                                margin: '0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Related Tickets',
                                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                                    padding: '4 0 5 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets1_Adm',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets1_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                //alert('ok');
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets1_Adm').trim().length > 0 && win.getValue('lblRelatedTickets1_Adm').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets1_Adm').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets1SEQ_Adm').trim().length === 2) ? win.getValue('lblRelatedTickets1SEQ_Adm').trim() : '00';

                                                                                    var strCIA = win.getValue('lblRelatedTickets1_Adm').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }

                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets1SEQ_Adm',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets2_Adm',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets2_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets2_Adm').trim().length > 0 && win.getValue('lblRelatedTickets2_Adm').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets2_Adm').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets2SEQ_Adm').trim().length === 2) ? win.getValue('lblRelatedTickets2SEQ_Adm').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets2_Adm').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }

                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets2SEQ_Adm',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets3_Adm',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets3_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets3_Adm').trim().length > 0 && win.getValue('lblRelatedTickets3_Adm').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets3_Adm').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets3SEQ_Adm').trim().length === 2) ? win.getValue('lblRelatedTickets3SEQ_Adm').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets3_Adm').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }

                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets3SEQ_Adm',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets4_Adm',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets4_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets4_Adm').trim().length > 0 && win.getValue('lblRelatedTickets4_Adm').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets4_Adm').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets4SEQ_Adm').trim().length === 2) ? win.getValue('lblRelatedTickets4SEQ_Adm').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets4_Adm').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }

                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets4SEQ_Adm',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    items: [
                                                                          {
                                                                            xtype: 'toolbar',
                                                                            items: [                                                                                
                                                                                {
                                                                                    xtype:'button',
                                                                                    id: prototype.id + '-btn-de-back-cjn-adm',
                                                                                    icon: 'resources/img/botones/prev.png',
                                                                                    listeners: {
                                                                                        click: 'imgPrev_clickHandler_adm'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype:'button',
                                                                                    id: prototype.id + '-btn-de-next-cjn-adm',
                                                                                    icon: 'resources/img/botones/next2.png',
                                                                                    listeners: {
                                                                                        click: 'imgNext_clickHandler_adm'
                                                                                    }
                                                                                }
                                                                            ]

                                                                          }

                                                                       ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        // <editor-fold defaultstate="collapsed" desc="Related Tickets Button">
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%',
                                                                width: 25,
                                                                margin: '0'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', height: 22},
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT1_Adm',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler_adm'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT2_Adm',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler_adm'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT3_Adm',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler_adm'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT4_Adm',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler_adm'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                }*/
                                            ]
                                        },
                                        // </editor-fold>
                                        
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});