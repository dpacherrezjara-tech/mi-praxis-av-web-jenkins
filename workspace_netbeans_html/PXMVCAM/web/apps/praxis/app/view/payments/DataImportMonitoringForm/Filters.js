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
                    xtype: 'datefield',
                    id: prototype.id + '-txtDATEPICKER',
                    name: 'IN_PROCDATE',
                    emptyText: 'Select a Date',
                    format: 'd/m/Y',
                    submitFormat: 'Ymd',
                    editable: false,
                    allowBlank: true,
                    width: 180,
                    fieldStyle: 'text-align:center',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: function (field) {
                                field.reset();
                            }
                        }
                    }
                },
                 {xtype: 'tbspacer', width: 60},
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
                    editable: true, // <-- necesario para escribir
                    typeAhead: true, // <-- autocompleta
                    minChars: 1, // <-- desde la primera letra filtra
                    forceSelection: false, // <-- permite escribir sin seleccionar
                    enableKeyEvents: true,
                    margin: '0 10 0 0'
                }













                //aqui agregamos mas filtrso
            ]
        }
    ]
});



