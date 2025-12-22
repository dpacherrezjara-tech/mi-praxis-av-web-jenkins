Ext.define('Ext.Praxis.view.payments.DataImportMonitoringForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 15px 0px',
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
                    xtype: 'combo',
                    id: prototype.id + '-cmbFuente',
                    width: 180,
                    fieldLabel: 'Source',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'value',
                    displayField: 'text',
                    editable: false, 
                    forceSelection: true,
                    value: 'BSP',  
                    
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            {value: 'BSP', text: 'BSP'},
                            {value: 'ICCS', text: 'ICCS'},
                            {value: 'ARC', text: 'ARC'}
                        ]
                    }
                },

                 {xtype: 'tbspacer', width: 10},

                
                  {
                    xtype: 'label',
                    text: 'COUNTRY :',
                    padding: '2 0 0 20',
                    width: 90
                },


                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbIN_COUNTRY',
                    width: 130,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    editable: true, 
                    typeAhead: true, // <-- autocompleta
                    minChars: 1, // <-- desde la primera letra filtra
                    forceSelection: false, // <-- permite escribir sin seleccionar
                    enableKeyEvents: true,
                    value: 'CO',
                    margin: '0 10 0 0'
                },
                
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateType',
                    width: 210,
                    fieldLabel: 'Date Type',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'value',
                    displayField: 'text',
                    editable: false, // No permite escribir
                    forceSelection: true,
                    value: 'C',  
                    
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            {value: 'C', text: 'Creation Date'},
                            {value: 'F', text: 'File Date'}
                        ]
                    }
                },

                 {xtype: 'tbspacer', width: 10},
                
                
                
                {
                    xtype: 'datefield',
                    fieldLabel: 'Time Picker',
                    id: prototype.id + '-txtDATEPICKER',
                    name: 'IN_PROCDATE',
                    emptyText: 'Select a Date',
                    format: 'd/m/Y',
                    submitFormat: 'Ymd',
                    value: new Date(),   
                    editable: false,
                    allowBlank: true,
                    width: 280,
                    fieldStyle: 'text-align:center'

                },
                 {xtype: 'tbspacer', width: 60}
              


                //aqui agregamos mas filtrso
            ]
        }
    ]
});



