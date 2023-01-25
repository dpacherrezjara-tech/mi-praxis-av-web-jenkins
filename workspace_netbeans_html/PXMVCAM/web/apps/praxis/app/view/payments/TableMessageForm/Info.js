Ext.define('Ext.Praxis.view.payments.TableMessageForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1400,
                height: 700,
                align: 'center'
            },
            
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border:true,
//                            margin: '1',
                             height: 550,
                             width: 1000,  
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataAirport',
                                    height: 510,
                                    width: 1000,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Nbr', dataIndex: 'RN', width: 50},
                                            {text: 'Code',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Message', dataIndex: 'CODEM', width: 100}
                                                ]
                                            }
                                            ,
                                            {text: 'Description', 
                                                width: 780, 
                                                align: 'center',
                                                columns: [
                                                    {text: '', dataIndex: 'DESCR', width: 780, align: 'left'}
                                                ]
                                            }
                                            
                                            ,
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 65,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                { xtype: 'tbspacer', width: 7, height: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id +'-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 998,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 998,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                            ]  
                        }
                   ]                             
        },
        
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 1px;',
                bodyStyle: 'background: transparent;',
                border: false
            }
          }
        ]
      }
    ] 
  }   
);


