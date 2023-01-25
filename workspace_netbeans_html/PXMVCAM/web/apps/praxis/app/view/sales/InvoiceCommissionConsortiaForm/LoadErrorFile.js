Ext.define('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.LoadErrorFile',{
    extend: 'Ext.window.Window',
    alias: 'widget.LoadErrorFileInvoiceCommissionConsortiaForm',
    requires:[
        'Ext.Praxis.controller.sales.InvoiceCommissionConsortia.LoadErrorFileController'
    ],
    controller: 'LoadErrorFileController',
    title:'Load Error File Invoice Commission Consortia',
    id: prototype.idLoadErrorFileConsortia + '-win',
    header:true,
    height:500,
    width:860,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #DFE5F4;"',
                            layout: 'vbox',
                            border: true,
                            margin: '0 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: 840
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #DFE5F4;"',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            id: prototype.idLoadErrorFileConsortia + '-txtError',
                                            width: 800,
                                            height:450
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});