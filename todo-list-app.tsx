import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TodoList = () => {
  const [workTodos, setWorkTodos] = useState([
    { id: 1, text: 'Email', completed: false },
    { id: 2, text: 'Team meeting', completed: false }
  ]);
  
  const [homeTodos, setHomeTodos] = useState([
    { id: 1, text: 'Buy Milk', completed: true },
    { id: 2, text: 'Laundry', completed: false }
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleAddTodo = () => {
    if (newItem.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newItem,
        completed: false
      };
      
      if (activeTab === 'work') {
        setWorkTodos([...workTodos, newTodo]);
      } else {
        setHomeTodos([...homeTodos, newTodo]);
      }
      setNewItem('');
    }
  };

  const toggleTodo = (id, isWork) => {
    if (isWork) {
      setWorkTodos(workTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } else {
      setHomeTodos(homeTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const TodoItems = ({ todos, isWork }) => (
    <div className="space-y-2">
      {todos.map(todo => (
        <div key={todo.id} className="flex items-center space-x-2">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id, isWork)}
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>To Do</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="home" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="work">Work</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="space-y-4">
            <TodoItems todos={homeTodos} isWork={false} />
          </TabsContent>
          
          <TabsContent value="work" className="space-y-4">
            <TodoItems todos={workTodos} isWork={true} />
          </TabsContent>

          <div className="flex space-x-2 mt-4">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="New item"
              className="flex-1"
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodoList;
