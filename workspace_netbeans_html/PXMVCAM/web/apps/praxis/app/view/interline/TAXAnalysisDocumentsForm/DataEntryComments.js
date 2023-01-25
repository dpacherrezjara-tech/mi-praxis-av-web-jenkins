Ext.define('Ext.Praxis.view.interline.TAXAnalysisDocumentsForm.DataEntryComments', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCommentsTAXAnalysisDocumentsForm',

    controller: 'DataEntryCommentsTAXAnalysisDocumentsController',

    requires: [
        'Ext.Praxis.controller.interline.TAXAnalysisDocuments.DataEntryCommentsTAXAnalysisDocumentsController'
    ],

    title: 'Save Comments',
    header: true,
    height: 320,
    width: 670,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        padding: '1 12'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '5 12 1 12',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Comments',
                                    style: 'font-weight:bold;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod1',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 50,
                                    listeners: {
                                        keypress: 'txtFilterValue_keyDownHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    style: 'font-weight:bold;background:#3ED42A;',
                                    html: '<strong style="background:#3ED42A;color:white;">..</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'View Comments',
                                    width: 40,
                                    listeners: {
                                        click: 'viewComments'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment1',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'tbspacer', width: 175},
                                {xtype: 'tbspacer', width: 11, id: prototype.id + '-tbs1'},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtConcep1',
                                    fieldStyle: 'text-align:left;',
                                    hidden: true,
                                    width: 10
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment2',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'tbspacer', width: 90},
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 50,
                                    listeners: {
                                        keypress: 'txtFilterValue_keyDownHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    style: 'font-weight:bold;background:#3ED42A;',
                                    html: '<strong style="background:#3ED42A;color:white;">..</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'View Comments',
                                    width: 40,
                                    listeners: {
                                        click: 'viewComments'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment3',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 4">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'tbspacer', width: 175},
                                {xtype: 'tbspacer', width: 11, id: prototype.id + '-tbs1'},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtConcep2',
                                    fieldStyle: 'text-align:left;',
                                    hidden: true,
                                    width: 10
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment4',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 5">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'tbspacer', width: 90},
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCod3',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 50,
                                    listeners: {
                                        keypress: 'txtFilterValue_keyDownHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    style: 'font-weight:bold;background:#3ED42A;',
                                    html: '<strong style="background:#3ED42A;color:white;">..</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'View Comments',
                                    width: 40,
                                    listeners: {
                                        click: 'viewComments'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment5',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 6">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'tbspacer', width: 175},
                                {xtype: 'tbspacer', width: 11, id: prototype.id + '-tbs1'},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtConcep3',
                                    fieldStyle: 'text-align:left;',
                                    hidden: true,
                                    width: 10
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtComment6',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    width: 400
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Fila 7">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Clearing Date :',
                                    style: 'font-weight:bold;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format YYYYMM'
                                    },
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtClear',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 275},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSave',
                                    style: 'font-weight:bold;background:#024F79;',
                                    html: '<strong style="background:#024F79;color:white;">Save Comments</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Save Comments',
                                    width: 140,
                                    listeners: {
                                        click: 'btnSave_clickHandler'
                                    }
                                }
                            ]
                        }
                        //</editor-fold>
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
            ]
        }
    ]
});