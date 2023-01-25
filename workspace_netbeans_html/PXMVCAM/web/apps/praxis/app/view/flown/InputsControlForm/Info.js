

Ext.define('Ext.Praxis.view.flown.InputsControlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    requires: [
        'Ext.Praxis.view.flown.InputsControlForm.InfoGrids',
        'Ext.Praxis.view.flown.InputsControlForm.InfoCalendar'
    ],
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;',
    items: [
        {
            region: 'center',
             bodyStyle: 'background-color: #E3EAEF;',
             
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {               
                border: false,
                width: 1300,
                height: 580,
                align: 'center',
                bodyStyle: 'background-color: #E3EAEF;'
                
            }
            ,
            items: [
                {
                    xtype: prototype.id + '-infoGrids',
                    id: prototype.id + '-infoGrids'
                }
                ,
                {
                    xtype: prototype.id + '-infoCalendar',
                    bodyStyle: 'background-color: #E3EAEF;',
                    id: prototype.id + '-infoCalendar',
                    width: 1500
                }

            ]
        }

    ]
}
);