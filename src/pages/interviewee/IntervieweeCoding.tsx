
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const IntervieweeCoding: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Write your code here\nfunction solution(input) {\n  // Implement your solution\n  return input;\n}\n\n// Test your solution\nconsole.log(solution("test"));`);
  const [output, setOutput] = useState('');
  
  const handleRunCode = () => {
    // Mock code execution
    setOutput('> "test"\n> Console output will appear here.');
  };

  const handleClearOutput = () => {
    setOutput('');
  };

  const codeExamples = {
    javascript: `// Write your code here
function solution(input) {
  // Implement your solution
  return input;
}

// Test your solution
console.log(solution("test"));`,
    python: `# Write your code here
def solution(input):
    # Implement your solution
    return input

# Test your solution
print(solution("test"))`,
    java: `// Write your code here
public class Solution {
    public static String solution(String input) {
        // Implement your solution
        return input;
    }

    public static void main(String[] args) {
        System.out.println(solution("test"));
    }
}`
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // @ts-ignore
    setCode(codeExamples[value]);
    setOutput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coding Environment</h1>
        <p className="text-muted-foreground">Practice coding before your interview.</p>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Code Editor</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 min-h-[300px]">
                <textarea 
                  className="w-full h-full min-h-[300px] bg-transparent font-mono text-sm focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900">
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleRunCode}>
                    Run Code
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCode(codeExamples[language as keyof typeof codeExamples])}>
                    Reset
                  </Button>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Save
                </Button>
              </div>
            </div>

            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm">Output</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleClearOutput}>
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 min-h-[100px] max-h-[200px] overflow-auto">
                  <pre className="text-sm font-mono text-gray-700 dark:text-gray-300">
                    {output}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md border border-purple-100 dark:border-purple-900/30">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Practice Tips</h3>
              <ul className="list-disc list-inside text-sm text-purple-700 dark:text-purple-400 space-y-1">
                <li>Test your solution with multiple inputs</li>
                <li>Consider edge cases and performance</li>
                <li>Practice explaining your approach out loud</li>
                <li>Your code will be visible to the interviewer during the session</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader>
          <CardTitle>Practice Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 border rounded-md hover:border-purple-300 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white">String Reversal</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Write a function that reverses a string.</p>
            </div>
            <div className="p-3 border rounded-md hover:border-purple-300 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white">Palindrome Checker</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Write a function that checks if a string is a palindrome.</p>
            </div>
            <div className="p-3 border rounded-md hover:border-purple-300 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white">FizzBuzz</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Implement the classic FizzBuzz problem.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntervieweeCoding;
