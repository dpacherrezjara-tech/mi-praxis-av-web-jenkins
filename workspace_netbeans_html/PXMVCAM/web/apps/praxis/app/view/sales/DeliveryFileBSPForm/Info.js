Ext.define('Ext.Praxis.view.sales.DeliveryFileBSPForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: white;',
    defaults: {
        bodyStyle: 'background: white;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            bodyStyle: 'background: white;',
            id: prototype.id + '-regionCenterGrid01',
            margin: '10 ,0 ,0 ,0',
            width: 600,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: white;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'textareafield',
                    height: 450,
                    border: false,
                    id: prototype.id + '-txaDelivery',
                    padding: '0 0 0 0',
                    width: 870,
                    fieldLabel: '',
                    readOnly: true,
                    labelPad: 0,
                    labelSeparator: ' ',
                    fieldStyle: 'color: #0B333C; font-size: 10px; font-family : Courier New; background: white;',
                    labelWidth: 0
                    //fontFamily="keyDown="txtPagFilterValue_keyDownHandler(event)"
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: 870,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
//                            width: prototype.widthGrid,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

