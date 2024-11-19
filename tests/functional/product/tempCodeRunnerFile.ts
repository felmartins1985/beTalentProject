        country: 'Brasil',
      },
    })
    const response = await client.patch('/clients/1').json({
      telephone: '+5511987654111',
    })
    response.assertStatus(200)
  })
})