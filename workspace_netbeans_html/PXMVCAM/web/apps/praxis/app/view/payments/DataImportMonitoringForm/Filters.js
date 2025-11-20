Ext.define('Ext.Praxis.view.payments.DataImportMonitoringForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 15px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [

                
                  {
                    xtype: 'label',
                    text: 'COUNTRY :',
                    padding: '2 0 0 20',
                    width: 90
                },
                 
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbIN_COUNTRY',
                    disabled: false,
                    width: 130,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    hidden: false,
                    editable: false,
                    hiddenLabel: false,
                    margin: '0 10 0 0',
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
                },
                
                { xtype: 'tbspacer', width: 40 }


                
    



                

                
                
                
                
                //aqui agregamos mas filtrso
            ]
        }
    ]
});



