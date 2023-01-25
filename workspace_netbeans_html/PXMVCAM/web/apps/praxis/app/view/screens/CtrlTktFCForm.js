prototype.TktFC = {
    id: 'CtrlTktFCForm'
};
Ext.define('Ext.Praxis.view.screens.CtrlTktFCForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlTktFCForm',
    requires: [
        'Ext.Praxis.controller.screens.CtrlTktFCController'
    ],
    controller: 'CtrlTktFCController',
    title: 'Fare Calc',
    header: true,
    width: 500,
    height: 150,
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
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'textarea',
                    width: 400,
                    height: 50,
                    id: prototype.TktFC.id+'-txaFC',
                    fieldStyle: 'letter-spacing:0.8px; line-height:19.9px; background-color:transparent;text-align:left; font-size:10px; font-family:"Courier New";',
                    margin: '5',
                    inputAttrTpl: [
                        'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
                    ],
                    readOnly: true,
                    value: ""
                }
            ]
        }
    ],
    dockedItems: [
    ]
});