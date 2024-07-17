import { Request, Response } from 'express';

let items: { id: number, name: string }[] = [];
let currentId = 1;

export const createItem = (req: Request, res: Response) => {
  const { name } = req.body;
  const newItem = { id: currentId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

export const getItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const itemId = parseInt(id, 10);
  console.log(`Fetching item with ID: ${itemId}`);
  const item = items.find(i => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
};

export const updateItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const itemId = parseInt(id, 10);
  console.log(`Updating item with ID: ${itemId}`);
  const { name } = req.body;
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.name = name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
};

export const deleteItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const itemId = parseInt(id, 10);
  console.log(`Deleting item with ID: ${itemId}`);
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
};
