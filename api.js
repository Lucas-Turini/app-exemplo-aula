import express from 'express';
import { Especialidades, Cidades, Medicos, sequelize } from './models/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

app.post('/especialidades', async (req, res)=>{
  try{
    const especialidade = await Especialidades.create(req.body);
    res.status(201).json(especialidade);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

app.get('/especialidades', async (req, res)=>{
  try{
    const especialidades = await Especialidades.findAll();
    res.status(200).json(especialidades);
  } catch(error){
  res.status(400).json({error: error.message});

    }
});

app.get('/especialidades/:id', async (req,res)=>{
  try{
    const especialidade = await Especialidades.findByPk(req.params.id);
    if (especialidade){
      res.status(200).json(especialidade);
    }else{
      res.status(400).json({error: 'Especialidade não encontrada'});
    }
  } catch (error){
    res.status(500).json({ error: error.message});
  }
    });

    app.delete('/especialidades/:id', async (req, res) =>{
      try{
        const especialidade = await Especialidades.findByPk(req.params.id);
        if (especialidade) {
          await especialidade.destroy();
          res.status(200).send();
        } else{
          res.status(400).jsaon({error: 'Especialidade não encontrada'});
        }
      } catch (error){
        res.status(500).json({ error: error.message});
      }
    });

  app.post('/Cidades', async (req, res)=>{
    try{
      const cidade = await Cidades.create(req.body);
      res.status(201).json(cidade);
    } catch (error) {
      res.status(400).json({error: error.message});
  }
});

app.get('/Cidades', async (req, res)=>{
  try{
    const cidade = await Cidades.findAll();
    res.status(200).json(cidade);
   }catch(error){
    res.status(400).json({error: error.message});
  }
});

app.get('/Cidades/:id', async (req,res)=>{
  try{
    const cidade = await Cidades.findByPk(req.params.id);
    if (cidade){
      res.status(200).json(cidade);
    }else{
      res.status(400).json({error: 'Cidade não encontrada'});
    }
  } catch (error){
    res.status(500).json({ error: error.message});
  }
    });

  app.delete('/Cidades/:id', async (req, res) =>{
      try{
        const cidade = await Cidades.findByPk(req.params.id);
        if (cidade) {
          await cidade.destroy();
          res.status(200).send();
        } else{
          res.status(400).jsaon({error: 'Cidade não encontrada'});
        }
      } catch (error){
        res.status(500).json({ error: error.message});
      }
    });

app.post('/Medicos', async (req, res)=>{
    try{
      const medico = await Medicos.create(req.body);
      res.status(201).json(medico);
    } catch (error) {
      res.status(400).json({error: error.message});
  }
});

app.get('/Medicos', async (req, res)=>{
  try{
    const medico = await Medicos.findAll();
    res.status(200).json(medico);
   }catch(error){
    res.status(400).json({error: error.message});
  }
});

app.get('/Medicos/:id', async (req,res)=>{
  try{
    const medico = await Medicos.findByPk(req.params.id);
    if (medico){
      res.status(200).json(medico);
    }else{
      res.status(400).json({error: 'Medico não encontrada'});
    }
  } catch (error){
    res.status(500).json({ error: error.message});
  }
    });

app.delete('/Medicos/:id', async (req, res) =>{
      try{
        const medico = await Medicos.findByPk(req.params.id);
        if (medico) {
          await medico.destroy();
          res.status(200).send();
        } else{
          res.status(400).jsaon({error: 'Medico não encontrada'});
        }
      } catch (error){
        res.status(500).json({ error: error.message});
      }
    });


app.get('/medicos/busca', async (req, res)=>{
  try{
    const {especialidade, cidade} = req.query;
    const where ={};
    if (especialidade) where.EspecialidadeId = especialidade;
    if (cidade) where.CidadeId = cidade;
    const medicos = await Medicos.findAll({
      where,
      include: [
        { model: Especialidades, as: 'especialidade' },
        { model: Cidades, as: 'cidade' }
      ] 
    });
    res.json (Medicos);
  }catch (error){
   res.status(500).json({ error: error.message});
  }
});




// Sincronizar banco de dados e iniciar servidor
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao sincronizar banco de dados:', error);
});